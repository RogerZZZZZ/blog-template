import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IBasicInfo } from '@interface/profile'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

import {
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

const defaultValue: IBasicInfo = {
  username: '',
  github: '',
  email: '',
  instruction: '',
}

interface IBasicInfoProps extends IComponentProps {
  onChange?: any,
  data: any,
}

const BasicInfoInput = ({ onChange }: IBasicInfoProps) => {
  const [value, setValue] = useState(Object.assign({}, defaultValue) as IBasicInfo)

  const updateUsername = (username: any) => {
    value.username = username
    udpateValue(value)
  }

  const updateGithub = (github: string) => {
    value.github = github
    udpateValue(value)
  }

  const udpateEmail = (email: string) => {
    value.email = email
    udpateValue(value)
  }

  const updateIntruction = (instruction: string) => {
    value.instruction = instruction
    udpateValue(value)
  }

  const udpateValue = (value: IBasicInfo) => {
    setValue(value)
    onChange(value)
  }

  return (
    <Flex direction="column">
      <Flex>
        <InputTitleWrapper title="Username">
          <Input onChange={(e) => updateUsername(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Github Address">
          <Input onChange={(e) => updateGithub(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Email">
          <Input onChange={(e) => udpateEmail(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="instruction">
          <Input onChange={(e) => updateIntruction(e.target.value)} />
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(BasicInfoInput)