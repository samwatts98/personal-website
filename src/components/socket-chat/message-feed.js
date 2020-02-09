import React from 'react'
import styles from './socket-chat.module.scss'

const MessageSlot = props => (
  <div className={styles.messageSlot}>
    <p>
      <b>{props.username} :</b> {props.message}
    </p>
  </div>
)

const MessageFeed = props => (
  <div className={styles.messageFeed}>
    {props.messages.map((item, idx) => (
      <MessageSlot
        username={item.username}
        message={item.message}
        key={item.id}
      />
    ))}
  </div>
)

export default MessageFeed
export { MessageSlot }
