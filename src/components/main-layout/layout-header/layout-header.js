import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styles from './layout-header.module.scss'

const HeadingLinkItem = props => (
  <li className={styles.navBarLink}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const WebsiteTitle = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Link to="/">
        <h3 className={styles.headerText}>{data.site.siteMetadata.title}</h3>
      </Link>
    )}
  />
)

const LayoutHeader = ({ data }) => (
  <header className={styles.header}>
    <WebsiteTitle />
    <nav className={styles.navBar}>
      <HeadingLinkItem to="/contact/">Contact</HeadingLinkItem>
    </nav>
  </header>
)
export default LayoutHeader
