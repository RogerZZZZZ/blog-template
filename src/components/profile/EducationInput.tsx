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

const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'

interface IEducation {
  startTime: string,
  endTime: string,
  school: string,
  major: string,
}

const defaultValue: IEducation = {
  startTime: '',
  endTime: '',
  school: '',
  major: '',
}

interface IEducationInputProp extends IComponentProps {
  onChange?: any,
  idx?: number,
}

const EducationInput = ({ idx, onChange }: IEducationInputProp) => {
  const [value, setValue] = useState(Object.assign({}, defaultValue) as IEducation)

  const timeRangeChange = (data: any) => {
    value.startTime = data[0].format(dateFormat)
    value.endTime = data[1].format(dateFormat)
    udpateValue(value)
  }

  const updateSchool = (data: string) => {
    value.school = data
    udpateValue(value)
  }

  const updateMajor = (data: string) => {
    value.major = data
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
                      onChange={(dates) => timeRangeChange(dates)}/>
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="School">
          <Input onChange={(e) => updateSchool(e.target.value)} />
        </InputTitleWrapper>
      </Flex>

      <Flex>
        <InputTitleWrapper title="Major">
          <Input onChange={(e) => updateMajor(e.target.value)}/>
        </InputTitleWrapper>
      </Flex>
    </Flex>
  )
}

export default injectSheet({

})(EducationInput)