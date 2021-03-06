import { IPostCard } from '@interface/index'
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
      <span><b>{date}{pinTag}</b></span>
    )
  }

  const continueToRead = () => {
    window.location.href = `/blog?id=${props._id}`
  }

  const renderTime = () => (
    !!props.minutes ?
      Array.from({length: Math.ceil(props.minutes / 10)}).map((el, idx) => <Icon type="coffee" key={idx}/>)
    : <div />
  )

  return (
    <Card className={classes.post}>
      <div className={classes.titleContent}>
        <a className={classes.title}>{props.title}</a>
        {dateRender()}
      </div>

      <span>
        {renderTime()}
        {props.minutes} mins read
      </span>

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
    fontSize: '1.6rem',
  },
  postContent: {
    marginBottom: '10px',
  },
})(PostCard)