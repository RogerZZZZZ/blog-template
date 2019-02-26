import { UserCons } from '@constants'
import { IRouterProps } from '@interface'
import { logState, profileState } from '@reducers/state'
import { defaultState, IUserState } from '@reducers/user'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Header, Content } = Layout

const ProfilePage = ({ classes }: IRouterProps) => {
  const [profile, setProfile] = useState(defaultState)
  
  const { success, username, github, introduction, linkedIn, email } = useMappedState(profileState)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: UserCons.FETCH_USER })
  }, [])

  useEffect(() => {
    setProfile({
      username,
      github,
      introduction,
      linkedIn,
      email,
      success,
    })
  }, [success])

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
