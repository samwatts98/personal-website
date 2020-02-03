import React from 'react'
import styles from './image.module.scss'

const Image = props => (
  <img
    className={styles.image}
    src={
      props.source ? props.source : 'https://source.unsplash.com/random/400x200'
    }
    alt={props.source & props.alt ? props.alt : 'randomised'}
  />
)

export default Image
