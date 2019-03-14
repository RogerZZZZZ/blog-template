import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IBasicInfo } from '@interface/profile'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

import {
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

interface IBasicInfoProps extends IComponentProps {
  onChange?: any
  data: IBasicInfo
}

const BasicInfoInput = ({ onChange, data }: IBasicInfoProps) => {
  const [value, setValue] = useState(data)

  useEffect(() => {
    setValue(data)
  }, [data])

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

  const updateIntruction = (introduction: string) => {
    value.introduction = introduction
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
          <Input value={data.username} onChange={(e) => updateUsername(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Github">
          <Input value={data.github} onChange={(e) => updateGithub(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Email">
          <Input value={data.email} onChange={(e) => udpateEmail(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Introduction">
          <Input value={data.introduction} onChange={(e) => updateIntruction(e.target.value)} />
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(BasicInfoInput)