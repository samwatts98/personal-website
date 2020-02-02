import React from 'react'
import styles from './main-layout.module.scss'
import LayoutHeader from './layout-header/layout-header'

export default ({ children }) => (
  <div className={styles.mainLayout}>
    <LayoutHeader />
    <div id="content">{children}</div>
    <div id="footer"></div>
  </div>
)
