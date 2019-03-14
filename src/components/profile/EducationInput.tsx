import Flex from '@components/common/Flex'
import { IComponentProps } from '@interface/index'
import { IEducation } from '@interface/profile'
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
const dateFormat = 'DD/MM/YYYY'

interface IEducationInputProp extends IComponentProps {
  data: IEducation
  onChange?: any
  idx?: number
}

const EducationInput = ({ idx, onChange, data }: IEducationInputProp) => {
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

  const updateSchool = (school: string) => {
    value.school = school
    udpateValue(value)
  }

  const updateMajor = (major: string) => {
    value.major = major
    udpateValue(value)
  }

  const udpateValue = (value: IEducation) => {
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
        <InputTitleWrapper title="School">
          <Input value={value.school} onChange={(e) => updateSchool(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Major">
          <Input value={value.major} onChange={(e) => updateMajor(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(EducationInput)