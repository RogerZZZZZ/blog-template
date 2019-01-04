import { IPostCard } from '@interface'
import * as React from 'react'
import injectSheet from 'react-jss'

import {
  Button,
  Card,
  Icon,
} from 'antd'

const PostCard = (props: IPostCard) => {
  const { classes } = props

  const dateRender = () => {
    const date = (new Date(props.updatedAt)).toDateString()
    const pinTag = props.pinned ? ' - PINNED' : ''
    return (
      <span>{date}{pinTag}</span>
    )
  }

  const continueToRead = () => {
    console.log('continue to read pid: ', props.postId)
  }

  return (
    <Card className={classes.post}>
      <div className={classes.titleContent}>
        <a className={classes.title}>{props.title}</a>
        {dateRender()}
      </div>

      <div className={classes.postContent}>
        {props.abstract}
      </div>

      <Button onClick={continueToRead}>
        Continue To Read<Icon type="right" />
      </Button>
    </Card>
  )
}


export default injectSheet({
  post: {
    width: '700px',
    margin: '20px auto',
  },
  titleContent: {
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2rem',
  },
  postContent: {
    marginBottom: '10px',
  },
})(PostCard)