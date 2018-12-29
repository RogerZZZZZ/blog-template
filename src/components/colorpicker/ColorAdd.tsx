import * as React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'
import { BlockPicker } from 'react-color'

import {
  Button,
  Modal,
  Icon,
  Input,
} from 'antd'

interface IProps {
  classes: any
}

const ColorAdd = ({ classes }: IProps) => {
  const [visible, setVisible] = useState(false)

  const tmpAction = () => {
    console.log('test action')
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
        onOk={closeAction}
        onCancel={closeAction}
        footer={[
          <Button key="back" onClick={tmpAction}>Return</Button>,
          <Button key="submit" type="primary" loading={false} onClick={tmpAction}>
            Submit
          </Button>,
        ]}
      >
        <Input placeholder='Input new tag name'/>
        <BlockPicker triangle="hide"/>
      </Modal>
    </div>
  )
}

export default injectSheet({

})(ColorAdd)