import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IProject } from '@interface/profile'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

import {
  DatePicker,
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

const dateFormat = 'DD/MM/YYYY'

interface IProjectInfoProp extends IComponentProps {
  onChange?: any
  idx?: number
  data: IProject
}

const EducationInput = ({ idx, onChange, data }: IProjectInfoProp) => {
  const [value, setValue] = useState(data)
  const [defaultDate, setDefaultDate] = useState(moment() as Moment)

  useEffect(() => {
    setValue(data)
    setDefaultDate(value.time ? moment(value.time, dateFormat) : moment())
  }, [data])

  const updateTime = (data: any) => {
    value.time = data.format(dateFormat)
    setDefaultDate(moment(value.time, dateFormat))
    updateValue(value)
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

  const updateValue = (value: IProject) => {
    setValue(value)
    onChange(idx, value)
  }

  return (
    <Flex direction="column">
      <Flex>
        <InputTitleWrapper title="Start Time">
          <DatePicker format={dateFormat}
                      value={defaultDate}
                      onChange={(date) => updateTime(date)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Name">
          <Input value={value.name} onChange={(e) => udpateName(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Introduction">
          <Input value={value.intro} onChange={(e) => updateIntroduction(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Skill">
          <Input value={value.skill} onChange={(e) => updateSkill(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Link">
          <Input value={value.link} onChange={(e) => updateLink(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(EducationInput)