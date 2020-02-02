import React from 'react'
import { Link } from 'gatsby'
import styles from './main-layout.module.scss'

const HeadingLinkItem = props => (
  <li className={styles.navBarLink}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <div className={styles.mainLayout}>
    <div className={styles.header}>
      <Link to="/">
        <h3 className={styles.headerText}>Sam Watts</h3>
      </Link>
      <ul className={styles.navBar}>
        <HeadingLinkItem to="/contact/">Contact</HeadingLinkItem>
        <HeadingLinkItem to="/contact/">Contact</HeadingLinkItem>
        <HeadingLinkItem to="/contact/">Contact</HeadingLinkItem>
      </ul>
    </div>
    <div id="content">{children}</div>
    <div id="footer"></div>
  </div>
)
