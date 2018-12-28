import * as React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'

import {
  Button,
  Modal,
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
      <Button type="primary" onClick={() => setVisible(true)}>
          Open Modal with customized footer
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={closeAction}
        onCancel={closeAction}
        footer={[
          <Button key="back" onClick={tmpAction}>Return</Button>,
          <Button key="submit" type="primary" loading={false} onClick={tmpAction}>
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default injectSheet({

})(ColorAdd)