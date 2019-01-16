import { IBasicProps, ITag } from '@interface'
import * as React from 'react'
import injectStyle from 'react-jss'
import TagAdd from './TagAdd'
import TagSearch from './TagSearch'

import {
  Layout,
} from 'antd'

const { Content } = Layout

interface IProps extends IBasicProps{
  editable: boolean
  exposeFn: (v: string[]) => void
  tags?: string[]
}

const TagPicker = ({ classes, tags, exposeFn }: IProps) => {

  return (
    <Content className={classes.container}>
      <TagSearch tags={tags} exposeFn={exposeFn}/>
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
})(TagPicker)