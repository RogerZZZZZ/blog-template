import addonHOC from '@components/common/Addon'
import BasicInfoInput from '@components/profile/BasicInfoInput'
import EducationInput from '@components/profile/EducationInput'
import ExperienceInfo from '@components/profile/ExperienceInfo'
import ProjectInfoInput from '@components/profile/ProjectInfoInput'
import TitleWrapper from '@components/profile/TitleWrapper'
import { UserCons } from '@constants'
import { IRouterProps } from '@interface/index'
import { IBasicInfo, IEducation, IExperience, IProject } from '@interface/profile'
import { profileState } from '@reducers/state'
import {
  Button,
} from 'antd'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const Education = addonHOC((props: any) => <EducationInput {...props}/>)
const Experience = addonHOC((props: any) => <ExperienceInfo {...props}/>)
const Projects = addonHOC((props: any) => <ProjectInfoInput {...props}/>)

const Profile = ({ classes }: IRouterProps) => {
  const [educationInfo, setEducation] = useState([] as IEducation[])
  const [experienceInfo, setExperience] = useState([] as IExperience[])
  const [projectInfo, setProjects] = useState([] as IProject[])
  const [basicInfo, setBasicInfo] = useState({} as IBasicInfo)

  const dispatch = useDispatch()
  
  const { success, 
    name, username, github, introduction, email, facebook, linkedIn, twitter, weibo, // basic info
    education,
    project,
    experience
  } = useMappedState(profileState)
    
  const EducationChild = useMemo(() => <Education data={education || []} onChange={setEducation}/>, [education])
  const ExperienceChild = useMemo(() => <Experience data={experience || []} onChange={setExperience} />, [experience])
  const ProjectChild = useMemo(() => <Projects data={project || []} onChange={setProjects}/>, [project])

  useEffect(() => {
    dispatch({ type: UserCons.FETCH_USER })
  }, [])

  useEffect(() => {
    setBasicInfo({
      name,
      username,
      github,
      linkedIn,
      facebook,
      weibo,
      twitter,
      introduction,
      email,
    })
    setEducation(education || [])
    setProjects(project || [])
    setExperience(experience || [])
  }, [success])

  const saveProfile = async () => {
    const payload: any = {
      ...basicInfo,
      education: educationInfo,
      experience: experienceInfo,
      project: projectInfo,
    }
    await dispatch({ type: UserCons.EDIT_USER, payload })
    window.location.reload()
  }

  return (
    <>
      <TitleWrapper title="Basic Info">
        <BasicInfoInput data={basicInfo} onChange={setBasicInfo}/>
      </TitleWrapper>

      <TitleWrapper title="Education Info">
        {EducationChild}
      </TitleWrapper>

      <TitleWrapper title="Project Info">
        {ProjectChild}
      </TitleWrapper>

      <TitleWrapper title="Experience Info">
        {ExperienceChild}
      </TitleWrapper>

      <Button type="primary" icon="save" onClick={saveProfile}>
        Save
      </Button>
    </>
  )
}

export default injectSheet({

})(Profile)
