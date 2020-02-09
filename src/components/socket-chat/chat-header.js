import React from 'react'
import styles from './socket-chat.module.scss'

import ConnectedUsers from './chat-users'

const ChatSummary = props => (
  <div className={styles.chatSummary}>
    <div className={styles.personalSummary}>
      <h4>Signed in as: {props.username}</h4>
      <h4>Status: {props.connected ? 'Connected' : 'disconnected'}</h4>
    </div>
    <div className={styles.lobbySummary}>
      <ConnectedUsers users={props.users} />
    </div>
  </div>
)

export default ChatSummary
