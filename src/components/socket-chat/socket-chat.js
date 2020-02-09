import React from 'react'
import randomWords from 'random-words'
import uuid from 'uuid'

import MessageFeed from './message-feed'
import MessageEntry from './message-entry'
import CurrentlyTyping from './chat-typing-info'
import ChatHeader from './chat-header'

import styles from './socket-chat.module.scss'

const PAYLOAD_TYPES = {
  NEW_CONNECTION: 'NEW_CONNECTION',
  END_CONNECTION: 'END_CONNECTION',
  NEW_MESSAGE: 'NEW_MESSAGE',
  TYPING: 'TYPING',
}

class SocketChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected_users: [],
      connected: false,
      typing: [],
      username: randomWords(2).join(' '),
      message: '',
      message_history: [],
    }
  }

  componentDidMount() {
    this.ws = new WebSocket(process.env.SOCKCHAT_SOCKET_URL)

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
      this.setState({ connected: true })
    }

    this.ws.onclose = event => {
      const payload = {
        username: this.state.username,
        type: PAYLOAD_TYPES.END_CONNECTION,
      }
      this.ws.send(JSON.stringify(payload))
      this.setState({ connected: false })
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
    if (this.state.message) {
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
    }
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
    if (payload['username'] !== this.state.username) {
      const connected_users = this.state.connected_users
      this.setState({
        connected_users: connected_users.concat(payload['username']),
      })
    }
  }

  handleLeftChat = payload => {
    if (payload['username'] !== this.state.username) {
      const connected_users = this.state.connected_users
      this.setState({
        connected_users: connected_users.splice(
          connected_users.indexOf(payload['username']),
          1,
        ),
      })
    }
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
        <ChatHeader
          username={this.state.username}
          connected={this.state.connected}
          users={this.state.connected_users}
        />
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
