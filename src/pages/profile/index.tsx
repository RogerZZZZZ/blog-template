import { IRouterProps } from '@interface'
import service from '@services'
import { Layout } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

const { Header, Content } = Layout

const ProfilePage = ({ classes }: IRouterProps) => {



  return (
    <Layout className={classes.homeBody}>
      <Header>Header</Header>

      <Content>
        <span>Content</span>
      </Content>
    </Layout>
  )
}

export default injectSheet({
  homeBody: {
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#e8e8e8',
  },
})(ProfilePage)
