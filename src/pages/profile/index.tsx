import UserWallPaper from '@components/profile/UserWallPaper'
import { UserCons } from '@constants'
import { IRouterProps } from '@interface/index'
import { IBasicInfo } from '@interface/profile'
import { profileState } from '@reducers/state'
import { defaultState, IUserState } from '@reducers/user'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Header, Content } = Layout

const ProfilePage = ({ classes }: IRouterProps) => {
  const [basicInfo, setBasicInfo] = useState({} as IBasicInfo)
  
  const { success, name, username, github, introduction, email } = useMappedState(profileState)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: UserCons.FETCH_USER })
  }, [])

  useEffect(() => {
    setBasicInfo({
      name,
      username,
      email,
      github,
      introduction,
    })
  }, [success])

  return (
    <Layout className={classes.homeBody}>
      <Header>Header</Header>

      <Content>
        <UserWallPaper data={basicInfo}/>
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
