import React from 'react'
import styles from './item-panel.module.scss'

const Avatar = props => {
  const [wobble, setWobble] = React.useState(0)
  return (
    <img
      src={props.source}
      className={styles.avatar}
      onAnimationEnd={() => setWobble(0)}
      onClick={() => setWobble(1)}
      wobble={wobble}
      alt="me!"
    />
  )
}

const ItemPanel = props => {
  return (
    <div className={styles.item}>
      <Avatar source={props.avatar} />
      <div className={styles.description}>
        <h2 className={styles.name}>{props.username}</h2>
        <p className={styles.excerpt}>{props.excerpt}</p>
      </div>
    </div>
  )
}

export default ItemPanel
