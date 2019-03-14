import addonHOC from '@components/common/Addon'
import BasicInfoInput from '@components/profile/BasicInfoInput'
import EducationInput from '@components/profile/EducationInput'
import ExperienceInfo from '@components/profile/ExperienceInfo'
import ProjectInfoInput from '@components/profile/ProjectInfoInput'
import TitleWrapper from '@components/profile/TitleWrapper'
import { IRouterProps } from '@interface/index'
import {
  Button,
} from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

const Education = addonHOC((props: any) => <EducationInput {...props}/>)
const Experience = addonHOC((props: any) => <ExperienceInfo {...props}/>)
const Projects = addonHOC((props: any) => <ProjectInfoInput {...props}/>)

const Profile = ({ classes }: IRouterProps) => {
  const [education, setEducation] = useState([] as any[])
  const [experience, setExperience] = useState([] as any[])
  const [projects, setProjects] = useState([] as any[])
  const [basicInfo, setBasicInfo] = useState({})

  const saveProfile = () => {
    console.log(education)
    console.log(experience)
    console.log(projects)
    console.log(basicInfo)
  }

  return (
    <>
      <TitleWrapper title="Basic Info">
        <BasicInfoInput data={{}} onChange={setBasicInfo}/>
      </TitleWrapper>

      <TitleWrapper title="Education Info">
        <Education data={[]} defaultValue={{}} onChange={setEducation}/>
      </TitleWrapper>

      <TitleWrapper title="Project Info">
        <Projects data={[]} defaultValue={{}} onChange={setProjects}/>
      </TitleWrapper>

      <TitleWrapper title="Experience Info">
        <Experience data={[]} defaultValue={{}} onChange={setExperience} />
      </TitleWrapper>

      <Button type="primary" icon="save" onClick={saveProfile}>
        Save
      </Button>
    </>
  )
}

export default injectSheet({

})(Profile)
