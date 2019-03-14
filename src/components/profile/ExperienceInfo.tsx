import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IExperience } from '@interface/profile'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

import {
  DatePicker,
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'

const defaultValue: IExperience = {
  startTime: '',
  endTime: '',
  company: '',
  title: '',
}

interface IExperienceInfo extends IComponentProps {
  onChange?: any,
  idx?: number,
}

const ExperienceInfoInput = ({ idx, onChange }: IExperienceInfo) => {
  const [value, setValue] = useState(Object.assign({}, defaultValue) as IExperience)

  const timeRangeChange = (data: any) => {
    value.startTime = data[0].format(dateFormat)
    value.endTime = data[1].format(dateFormat)
    udpateValue(value)
  }

  const udpateCompany = (company: string) => {
    value.company = company
    udpateValue(value)
  }

  const udpateTitle = (title: string) => {
    value.title = title
    udpateValue(value)
  }

  const udpateValue = (value: IExperience) => {
    setValue(value)
    onChange(idx, value)
  }

  return (
    <Flex direction="column">
      <Flex>
        <InputTitleWrapper title="Period">
          <RangePicker format={dateFormat} 
                      onChange={(dates) => timeRangeChange(dates)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Company">
          <Input onChange={(e) => udpateCompany(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Title">
          <Input onChange={(e) => udpateTitle(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(ExperienceInfoInput)