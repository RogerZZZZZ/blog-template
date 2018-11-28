import * as React from 'react'
import { useState } from 'react'
import { Input } from 'antd'

export default function LoginBox() {
  const [test, setTest] = useState('00')

  return (
    <div>
      <Input value={test} onChange={e => setTest(e.target.value)}/>
      <span>{test}</span>
    </div>
  )
}
