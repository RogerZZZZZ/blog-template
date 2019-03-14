import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IExperience } from '@interface/profile'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

import {
  DatePicker,
  Input,
} from 'antd'
import InputTitleWrapper from './InputTitleWrapper'

const { RangePicker } = DatePicker
const dateFormat = 'YYY/MM/DD'

interface IExperienceInfo extends IComponentProps {
  onChange?: any
  idx?: number
  data: IExperience
}

const ExperienceInfoInput = ({ idx, onChange, data }: IExperienceInfo) => {
  const [value, setValue] = useState(data)
  const [defaultDate, setDefaultDate] = useState([moment(), moment()] as [Moment, Moment])

  useEffect(() => {
    setValue(data)
    setDefaultDate([
      value.startTime ? moment(value.startTime, dateFormat) : moment(),
      value.endTime ? moment(value.endTime, dateFormat) : moment()
    ])
  }, [data])

  const timeRangeChange = (data: any) => {
    value.startTime = data[0].format(dateFormat)
    value.endTime = data[1].format(dateFormat)
    setDefaultDate([moment(value.startTime, dateFormat), moment(value.endTime, dateFormat)])
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
                      value={defaultDate}
                      onChange={(dates) => timeRangeChange(dates)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Company">
          <Input value={value.company} onChange={(e) => udpateCompany(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Title">
          <Input value={value.title} onChange={(e) => udpateTitle(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(ExperienceInfoInput)