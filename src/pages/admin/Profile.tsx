import addonHOC from '@components/common/Addon'
import Flex from '@components/common/Flex'
import EducationInput from '@components/profile/EducationInput'
import InputTitleWrapper from '@components/profile/InputTitleWrapper'
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

const Profile = ({ classes }: IRouterProps) => {
  const [education, setEducation] = useState([] as any[])

  const onChange = (data: any[]) => {
    setEducation(data)
    console.log('onchange', data)
  }

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
        <span>Education Info Part</span>
        <Education data={[]} defaultValue={{}} onChange={onChange}/>
      </TitleWrapper>

      <TitleWrapper title="Project Info">
        <span>Project Info Part</span>
      </TitleWrapper>

      <TitleWrapper title="Experience Info">
        <span>Experience Info Part</span>
      </TitleWrapper>
    </div>
  )
}

export default injectSheet({

})(Profile)
