import * as React from 'react'
import injectSheet from 'react-jss'
import { IPostCardProps } from '../@interface/InjectStyle'

import {
  Card,
  Button,
  Icon,
} from 'antd'

const PostCard = (props: IPostCardProps) => {
  const { classes } = props

  const dateRender = () => {
    const date = (new Date(props.createTime)).toDateString()
    const pinTag = props.pinned ? '-PINNED' : ''
    return (
      <span>{date}{pinTag}</span>
    )
  }

  const continueToRead = () => {
    console.log('continue to read pid: ', props.tid)
  }

  return (
    <Card>
      <div className={classes.titleContent}>
        <h2>{props.title}</h2>
        {dateRender()}
      </div>

      <div className={classes.postContent}>
        {props.abstract}
      </div>

      <Button onClick={continueToRead}>
        Continue To Read<Icon type="Right" />
      </Button>
    </Card>
  )
}


export default injectSheet({
  titleContent: {
    marginBottom: '5px'
  },
  postContent: {

  },
})(PostCard)