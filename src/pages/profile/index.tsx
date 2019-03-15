import Header from '@components/header/index'
import EducationTimeline from '@components/profile/EducationTimeline'
import ExperienceTimeline from '@components/profile/ExperienceTimeline'
import ProfileItem from '@components/profile/ProfileItem'
import ProjectList from '@components/profile/ProjectList'
import UserWallPaper from '@components/profile/UserWallPaper'
import { UserCons } from '@constants'
import { IRouterProps } from '@interface/index'
import { IBasicInfo } from '@interface/profile'
import { profileState } from '@reducers/state'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Content } = Layout

const ProfilePage = ({ classes }: IRouterProps) => {
  const [basicInfo, setBasicInfo] = useState({} as IBasicInfo)
  
  const { success, name, username, github, introduction, email,
      education, project, experience } = useMappedState(profileState)
  
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
      <Header />
      <Content>
        <UserWallPaper data={basicInfo} />

        <ProfileItem title="Education">
          <EducationTimeline data={education || []} />
        </ProfileItem>

        <ProfileItem title="Projects" bgColor="#e8e8e8">
          <ProjectList data={project || []}/>
        </ProfileItem>

        <ProfileItem title="Experiences">
          <ExperienceTimeline data={experience || []} />
        </ProfileItem>
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
    backgroundColor: '#fff',
  },
})(ProfilePage)
