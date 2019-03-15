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

const { TextArea } = Input

interface IBasicInfoProps extends IComponentProps {
  onChange?: any
  data: IBasicInfo
}

const BasicInfoInput = ({ onChange, data }: IBasicInfoProps) => {
  const [value, setValue] = useState(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  const updateUsername = (name: any) => {
    value.name = name
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
          <Input value={value.name} onChange={(e) => updateUsername(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Github">
          <Input value={value.github} onChange={(e) => updateGithub(e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Email">
          <Input value={value.email} onChange={(e) => udpateEmail(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Introduction">
          <TextArea value={value.introduction} 
                    rows={4}
                    style={{ width: 400}}
                    onChange={(e) => updateIntruction(e.target.value)} />
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(BasicInfoInput)