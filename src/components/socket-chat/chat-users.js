import React from 'react'
import styles from './socket-chat.module.scss'

const ConnectedUsers = props => (
  <div>
    <h4>Other active users:</h4>
    <ul className={styles.listOfUsers}>
      {props.users.map((user, idx) => (
        <li key={idx}>{user}</li>
      ))}
    </ul>
  </div>
)

export default ConnectedUsers
