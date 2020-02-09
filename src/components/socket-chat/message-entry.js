import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

import styles from './socket-chat.module.scss'

const MessageEntry = props => (
  <form className={styles.messageEntry} onSubmit={props.handleSubmitMessage}>
    <TextareaAutosize value={props.message} onChange={props.handleChange} />
    <input type="submit" value="Send" />
  </form>
)

export default MessageEntry
