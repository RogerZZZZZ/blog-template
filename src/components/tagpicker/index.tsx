import { IBasicProps, ITag } from '@interface'
import * as React from 'react'
import injectStyle from 'react-jss'
import { useEventCallback } from 'rxjs-hooks'
import TagAdd from './TagAdd'
import TagSearch from './TagSearch'

import {
  Layout,
} from 'antd'

const { Content } = Layout

interface IProps extends IBasicProps{
  editable: boolean,
  tags?: ITag[],
}

const ColorPicker = ({ classes, tags }: IProps) => {

  return (
    <Content className={classes.container}>
      <TagSearch tags={tags}/>
      <TagAdd />
    </Content>
  )
}

export default injectStyle({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(ColorPicker)