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

type BasicFields = 'name' | 'github' | 'facebook' | 'twitter' | 'weibo' | 'introduction' | 'linkedIn' | 'email'

const BasicInfoInput = ({ onChange, data }: IBasicInfoProps) => {
  const [value, setValue] = useState(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  const udpateValue = (value: IBasicInfo) => {
    setValue(value)
    onChange(value)
  }

  const updateField = (fieldName: BasicFields, newVal: string) => {
    value[fieldName] = newVal
    udpateValue(value)
  }

  return (
    <Flex direction="column">
      <Flex>
        <InputTitleWrapper title="Username">
          <Input value={value.name} onChange={(e) => updateField('name', e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Github">
          <Input value={value.github} onChange={(e) => updateField('github', e.target.value)} />
        </InputTitleWrapper>

        <InputTitleWrapper title="Email">
          <Input value={value.email} onChange={(e) => updateField('email', e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Twitter">
          <Input value={value.twitter} onChange={(e) => updateField('twitter', e.target.value)}/>
        </InputTitleWrapper>

        <InputTitleWrapper title="Facebook">
          <Input value={value.facebook} onChange={(e) => updateField('facebook', e.target.value)}/>
        </InputTitleWrapper>

        <InputTitleWrapper title="Weibo">
          <Input value={value.weibo} onChange={(e) => updateField('weibo', e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="LinkedIn">
          <Input value={value.linkedIn} onChange={(e) => updateField('linkedIn', e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Introduction">
          <TextArea value={value.introduction} 
                    rows={4}
                    style={{ width: 400}}
                    onChange={(e) => updateField('introduction', e.target.value)} />
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(BasicInfoInput)