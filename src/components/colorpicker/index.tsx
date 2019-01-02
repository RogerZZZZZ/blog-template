import { IBasicProps, ITag } from '@interface'
import * as React from 'react'
import injectStyle from 'react-jss'
import { useEventCallback } from 'rxjs-hooks'
import ColorAdd from './ColorAdd'
import ColorSearch from './ColorSearch'

import {
  Layout,
} from 'antd'

const { Content } = Layout

interface IProps extends IBasicProps{
  editable: boolean,
  tags: ITag[],
}

const ColorPicker = ({ classes, tags }: IProps) => {

  return (
    <Content className={classes.container}>
      <ColorSearch tags={tags}/>
      <ColorAdd />
    </Content>
  )
}

export default injectStyle({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '24px'
  },
})(ColorPicker)