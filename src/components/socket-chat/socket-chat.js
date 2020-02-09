import React from 'react'
import randomWords from 'random-words'
import uuid from 'uuid'

import MessageFeed from './message-feed'
import MessageEntry from './message-entry'
import CurrentlyTyping from './message-typing-info'

import styles from './socket-chat.module.scss'

const PAYLOAD_TYPES = {
  NEW_CONNECTION: 'NEW_CONNECTION',
  END_CONNECTION: 'END_CONNECTION',
  NEW_MESSAGE: 'NEW_MESSAGE',
  TYPING: 'TYPING',
}

const WS_URL =
  'ws' +
  (document.location.protocol === 'https:' ? 's' : '') +
  '://' +
  document.location.host.replace(':8000', ':8888') +
  '/ws'

class SocketChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typing: [],
      username: randomWords(2).join(' '),
      message: '',
      message_history: [],
    }
  }

  componentDidMount() {
    this.ws = new WebSocket(WS_URL)

    this.ws.onmessage = event => {
      const received_payload = JSON.parse(event.data)

      switch (received_payload['type']) {
        case PAYLOAD_TYPES.NEW_MESSAGE:
          this.handleReceiveNewMessage(received_payload)
          break
        case PAYLOAD_TYPES.NEW_CONNECTION:
          this.handleJoinedChat(received_payload)
          break
        case PAYLOAD_TYPES.END_CONNECTION:
          this.handleLeftChat(received_payload)
          break
        case PAYLOAD_TYPES.TYPING:
          this.handleReceiveTyping(received_payload)
          break
        default:
          console.error('unrecognised payload...')
      }
    }

    this.ws.onopen = event => {
      const payload = {
        username: this.state.username,
        type: PAYLOAD_TYPES.NEW_CONNECTION,
      }
      this.ws.send(JSON.stringify(payload))
    }

    this.ws.onclose = event => {
      const payload = {
        username: this.state.username,
        type: PAYLOAD_TYPES.END_CONNECTION,
      }
      this.ws.send(JSON.stringify(payload))
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }

  handleTypingChange = event => {
    const payload = {
      username: this.state.username,
      type: PAYLOAD_TYPES.TYPING,
      value: true,
    }

    if (!event.target.value) {
      payload['value'] = false
      this.ws.send(JSON.stringify(payload))
    } else if (!this.state.typing.includes(this.state.username)) {
      this.ws.send(JSON.stringify(payload))
    }

    this.setState({ message: event.target.value })
  }

  handleSubmitMessage = event => {
    const payload_message = {
      username: this.state.username,
      type: PAYLOAD_TYPES.NEW_MESSAGE,
      value: this.state.message,
      id: uuid.v4(),
    }
    this.ws.send(JSON.stringify(payload_message))
    this.setState({ message: '' })

    const payload_typing = {
      username: this.state.username,
      type: PAYLOAD_TYPES.TYPING,
      value: false,
    }
    this.ws.send(JSON.stringify(payload_typing))

    event.preventDefault()
  }

  handleReceiveNewMessage = payload => {
    const message_history = this.state.message_history

    const message = [
      {
        username: payload['username'],
        message: payload['value'],
        id: payload['id'],
      },
    ]

    this.setState({
      message_history: message_history.concat(message),
    })
  }

  handleJoinedChat = payload => {
    alert(payload['username'] + ' connected!')
  }

  handleLeftChat = payload => {
    alert(payload['username'] + ' disconnected!')
  }

  handleReceiveTyping = payload => {
    const typing = this.state.typing.slice()

    if (payload['value'] && !typing.includes(payload['username'])) {
      this.setState({ typing: typing.concat(payload['username']) })
    } else {
      this.setState({
        typing: typing.filter(name => name !== payload['username']),
      })
    }
  }

  render() {
    return (
      <div className={styles.socketChatContainer}>
        <h4>Signed in as: {this.state.username}</h4>
        <MessageFeed messages={this.state.message_history} />
        <CurrentlyTyping typing={this.state.typing} />
        <MessageEntry
          handleSubmitMessage={this.handleSubmitMessage}
          handleChange={this.handleTypingChange}
          username={this.state.username}
          message={this.state.message}
        />
      </div>
    )
  }
}

export default SocketChat
