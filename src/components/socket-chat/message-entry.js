import React from 'react'

import styles from './socket-chat.module.scss'

const MessageEntry = props => (
  <form className={styles.messageEntry} onSubmit={props.handleSubmitMessage}>
    <input type="text" value={props.message} onChange={props.handleChange} />
    <input type="submit" value="Send" />
  </form>
)

export default MessageEntry
