import { IRouterProps } from '@interface'
import { logState } from '@reducers/state'
import service from '@services'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

const { Header, Content } = Layout

const ProfilePage = ({ classes }: IRouterProps) => {
  const { username } = useMappedState(logState)

  useEffect(() => {
    console.log(username)
  }, [])

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
