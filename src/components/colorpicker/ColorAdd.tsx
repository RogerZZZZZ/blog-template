import { IBasicProps } from '@interface';
import { RootState } from '@reducers'
import service from '@services'
import * as React from 'react'
import { useState } from 'react'
import { BlockPicker } from 'react-color'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

import {
  Button,
  Icon,
  Input,
  Modal,
} from 'antd'

const tokenState = (state: RootState) => ({
  token: state.auth.token,
})

const ColorAdd = ({ classes }: IBasicProps) => {
  const { token } = useMappedState(tokenState)
  const [visible, setVisible] = useState(false)
  const [hex, setHex] = useState('#000')
  const [name, setName] = useState('')

  const submitTag = async () => {
    if (token) {
      const data = await service.requestFactory(service.tag.create, {
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