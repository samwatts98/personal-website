import React, { useState } from 'react'
import styles from './counter-button.module.scss'

const CounterButton = props => {
  const [count, setCount] = useState(0)
  return (
    <button
      className={styles.counterButton}
      onClick={() => setCount(count + 1)}
    >
      {props.preCountText} {count} {props.postCountText}
    </button>
  )
}

export default CounterButton
