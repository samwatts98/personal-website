import React, { useRef, useEffect } from 'react'
import styles from './socket-chat.module.scss'

const MessageSlot = props => (
  <div className={styles.messageSlot}>
    <p>
      <b>{props.username} :</b> {props.message}
    </p>
  </div>
)

const MessageFeed = ({ messages }) => {
  const messageFeedEndRef = useRef(null)
  const jumpToRecentMessage = () => {
    messageFeedEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(jumpToRecentMessage, [messages])
  return (
    <div id="message-feed" className={styles.messageFeed}>
      {messages.map((item, idx) => (
        <MessageSlot
          username={item.username}
          message={item.message}
          key={item.id}
        />
      ))}
      <div ref={messageFeedEndRef} />
    </div>
  )
}

export default MessageFeed
export { MessageSlot }
