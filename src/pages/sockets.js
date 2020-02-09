import React from 'react'
import MainLayout from '../components/main-layout/main-layout'
import PageTitle from '../components/page-title/page-title'
import SocketChat from '../components/socket-chat/socket-chat'

export default () => {
  return (
    <MainLayout>
      <SocketChat />
    </MainLayout>
  )
}
