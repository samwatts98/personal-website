import React from 'react'
import MainLayout from '../components/main-layout/main-layout'
import AnimatedImage from '../components/animated-image/animated-image'
import PageTitle from '../components/page-title/page-title'

export default () => (
  <MainLayout>
    <PageTitle titleText="Welcome!" />
    <AnimatedImage />
  </MainLayout>
)
