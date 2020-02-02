import React from 'react'
import PageTitle from '../components/page-title/page-title'
import ItemPanel from '../components/item-panel/item-panel'
import MainLayout from '../components/main-layout/main-layout'

export default () => (
  <MainLayout>
    <PageTitle titleText="Hello World!" />
    <ItemPanel
      username="Sam Watts"
      avatar="https://avatars0.githubusercontent.com/u/36446362?s=460&v=4"
      excerpt="Hello! I'm Sam."
    />
    <br />
    <br />
  </MainLayout>
)
