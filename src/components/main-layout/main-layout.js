import React from 'react'
import styles from './main-layout.module.scss'
import LayoutHeader from './layout-header/layout-header'
import LayoutFooter from './layout-footer/layout-footer'

export default ({ children }) => (
  <div className={styles.mainLayout}>
    <LayoutHeader />
    <main>{children}</main>
    <LayoutFooter />
  </div>
)
