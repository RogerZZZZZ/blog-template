import { Input, Tooltip } from 'antd'
import { InputProps } from 'antd/lib/input'
import * as React from 'react'

const formatNumber = (value: any) => {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

interface IProps extends InputProps{
  value: any
  onChange: any
}

const NumericInput = (props: IProps) => {
  const { value, onChange } = props

  const title = () => (
    !!value ?
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    : 'Input a number'
  )

  const innerOnChange = (e: any) => {
    const { value } = e.target
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
    if ((!Number.isNaN(value) 
        && reg.test(value))
        || value === '' || value === '-') {
          if (onChange && typeof onChange === 'function') {
            onChange(value)
          }
    }
  }

  return (
    <Tooltip
        trigger={'focus'}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...props}
          onChange={innerOnChange}
          placeholder="Input a number"
          maxLength={25}
        />
      </Tooltip>
  )
}

export default NumericInput