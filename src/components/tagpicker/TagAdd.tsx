import { IBasicProps } from '@interface';
import { tokenState } from '@reducers/state'
import service from '@services'
import * as React from 'react'
import { useState } from 'react'
import { TwitterPicker } from 'react-color'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

import {
  Button,
  Icon,
  Input,
  Modal,
} from 'antd'

const TagAdd = ({ classes }: IBasicProps) => {
  const { token } = useMappedState(tokenState)
  const [visible, setVisible] = useState(false)
  const [hex, setHex] = useState('#000')
  const [name, setName] = useState('')

  const submitTag = async () => {
    if (token) {
      const data = await service.send(service.tag.create, {
        name,
        hex,
      }, token)
      if (data) {
        closeAction()
      }
    }
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
          <Button key="back" onClick={closeAction}>Back</Button>,
          <Button key="submit" type="primary" loading={false} onClick={submitTag}>
            Create
          </Button>,
        ]}
      >
        <Input placeholder='Input new tag name' value={name}
          onChange={(e) => setName(e.target.value)}/>
        <div className={classes.colorSelect}>
          <TwitterPicker triangle="hide" color={hex}
            onChangeComplete={(color) => setHex(color.hex)}/>
        </div>
      </Modal>
    </div>
  )
}

export default injectSheet({
  colorSelect: {
    marginTop: '20px',
  },
})(TagAdd)