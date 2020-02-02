import React from 'react'
import MainLayout from '../components/main-layout/main-layout'
import PageTitle from '../components/page-title/page-title'
import ItemPanel from '../components/item-panel/item-panel'

export default () => (
  <MainLayout>
    <ItemPanel
      username="@samwatts98"
      avatar="https://avatars0.githubusercontent.com/u/36446362?s=460&v=4"
      excerpt="GitHub, DEV.to, CodePen, and Twitter.🧜‍♂️"
    />
  </MainLayout>
)
