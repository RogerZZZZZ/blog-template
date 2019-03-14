import addonHOC from '@components/common/Addon'
import Flex from '@components/common/Flex'
import EducationInput from '@components/profile/EducationInput'
import ExperienceInfo from '@components/profile/ExperienceInfo'
import InputTitleWrapper from '@components/profile/InputTitleWrapper'
import ProjectInfoInput from '@components/profile/ProjectInfoInput'
import TitleWrapper from '@components/profile/TitleWrapper'
import { IRouterProps } from '@interface'
import {
  Button,
  Input,
  Tag,
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

  return (
    <div>
      <TitleWrapper title="Basic Info">
        <Flex>
          <Flex direction="row">
            <InputTitleWrapper title="Username">
              <Input />
            </InputTitleWrapper>

            <InputTitleWrapper title="Github Address">
              <Input />
            </InputTitleWrapper>
          </Flex>

          <Flex direction="row">
            <InputTitleWrapper title="twitter">
              <Input />
            </InputTitleWrapper>

            <InputTitleWrapper title="instruction">
              <Input />
            </InputTitleWrapper>
          </Flex>
        </Flex>
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
    </div>
  )
}

export default injectSheet({

})(Profile)
