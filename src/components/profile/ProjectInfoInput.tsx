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

const { TextArea } = Input
const dateFormat = 'YYYY/MM/DD'

interface IProjectInfoProp extends IComponentProps {
  onChange?: any
  idx?: number
  data: IProject
}

type ProjectFields = 'name' | 'intro' | 'skill' | 'link'

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

  const updateValue = (value: IProject) => {
    setValue(value)
    onChange(idx, value)
  }

  const updateField = (fieldName: ProjectFields, newValue: string) => {
    value[fieldName] = newValue
    updateValue(value)
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
          <Input value={value.name} onChange={(e) => updateField('name', e.target.value)} />
        </InputTitleWrapper>
      </Flex>
      
      <Flex>
        <InputTitleWrapper title="Tech Stack">
          <Input value={value.skill} onChange={(e) => updateField('skill', e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Link">
          <Input value={value.link} onChange={(e) => updateField('link', e.target.value)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Introduction">
          <TextArea value={value.intro} 
                    rows={4}
                    style={{ width: 400 }}
                    onChange={(e) => updateField('intro', e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(EducationInput)