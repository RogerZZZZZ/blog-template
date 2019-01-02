import * as React from 'react'
import { useState } from 'react'
import { BlockPicker } from 'react-color'
import injectSheet from 'react-jss'
import service from '../../services'

import {
  Button,
  Icon,
  Input,
  Modal,
} from 'antd'

interface IProps {
  classes: any
}

const ColorAdd = ({ classes }: IProps) => {
  const [visible, setVisible] = useState(false)
  const [hex, setHex] = useState('#000')
  const [name, setName] = useState('')

  const submitTag = async () => {
    console.log(hex, name)
    const data = await service.tag.create({
      name,
      hex,
    })
  }

  const closeAction = () => setVisible(false)

  return (
    <div>
      <Button onClick={() => setVisible(true)} shape="circle">
        <Icon type="plus"/>
      </Button>
      <Modal
        visible={visible}
        title="Choose tag"
        onCancel={closeAction}
        footer={[
          <Button key="back" onClick={closeAction}>Cancel</Button>,
          <Button key="submit" type="primary" loading={false} onClick={submitTag}>
            Submit
          </Button>,
        ]}
      >
        <Input placeholder='Input new tag name' value={name}
          onChange={(e) => setName(e.target.value)}/>
        <BlockPicker triangle="hide" color={hex} 
          onChangeComplete={(color) => setHex(color.hex)}/>
      </Modal>
    </div>
  )
}

export default injectSheet({

})(ColorAdd)