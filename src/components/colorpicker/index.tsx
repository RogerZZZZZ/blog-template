import * as React from 'react'
import injectStyle from 'react-jss'
import { useEventCallback } from 'rxjs-hooks'
import ColorAdd from './ColorAdd'

import {
  Layout,
  Tag,
} from 'antd'

const { Content } = Layout

interface ITag {
  name: string,
  hex: string,
}

interface IProps {
  editable: boolean,
  classes?: any,
  tags: ITag[],
}

const ColorPicker = ({ classes, tags }: IProps) => {

  const renderTags = () => {
    return (
      tags.map((tag: ITag, idx: number) =>
        <Tag key={idx} closable color={tag.hex}>{tag.name}</Tag>
      )
    )
  }

  return (
    <Content className={classes.container}>
      {/* <BlockPicker onChangeComplete={}/> */}
      <ColorAdd />
      {renderTags()}
    </Content>
  )
}

export default injectStyle({
  colorPickBody: {

  },
  container: {

  },
})(ColorPicker)