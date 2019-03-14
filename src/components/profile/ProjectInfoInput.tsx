import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

import {
  DatePicker,
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

const dateFormat = 'DD/MM/YYYY'

interface IProjectInfo {
  time: string,
  name: string,
  link: string,
  skill: string,
  intro: string,
}

const defaultValue: IProjectInfo = {
  time: '',
  name: '',
  link: '',
  skill: '',
  intro: '',
}

interface IProjectInfoProp extends IComponentProps {
  onChange?: any,
  idx?: number,
}

const EducationInput = ({ idx, onChange }: IProjectInfoProp) => {
  const [value, setValue] = useState(Object.assign({}, defaultValue) as IProjectInfo)

  const updateTime = (data: any) => {
    value.time = data.format(dateFormat)
    updateValue(data)
  }

  const udpateName = (name: string) => {
    value.name = name
    updateValue(value)
  }
  
  const updateIntroduction = (intro: string) => {
    value.intro = intro
    updateValue(value)
  }

  const updateSkill = (skill: string) => {
    value.skill = skill
    updateValue(value)
  }

  const updateLink = (link: string) => {
    value.link = link
    updateValue(value)
  }

  const updateValue = (value: IProjectInfo) => {
    setValue(value)
    onChange(idx, value)
  }

  return (
    <Flex direction="column">
      <Flex>
        <InputTitleWrapper title="Start Time">
          <DatePicker format={dateFormat} 
                      onChange={(date) => updateTime(date)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Name">
          <Input onChange={(e) => udpateName(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Introduction">
          <Input onChange={(e) => updateIntroduction(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Skill">
          <Input onChange={(e) => updateSkill(e.target.value)}/>
        </InputTitleWrapper>

        <InputTitleWrapper title="Link">
          <Input onChange={(e) => updateLink(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(EducationInput)