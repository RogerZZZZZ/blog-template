import { IComponentProps, IPostCard } from '@interface/index'
import * as ramda from 'ramda'
import * as React from 'react'
import injectSheet from 'react-jss'
import short from 'short-uuid'

import {
  Divider,
  List,
} from 'antd'

interface IPostListProps extends IComponentProps {
  data: IPostCard[]
}

const PostList = ({ classes, data }: IPostListProps) => {
  const items: {[index: number]: IPostCard[] } = ramda.groupBy((item: IPostCard) => {
    try {
      const date: string = (new Date(item.createdAt)).getFullYear().toString()
      return date === 'NaN' ? 'Other' : date
    } catch (err) {
      return 'Other'
    }
  })(ramda.sort((a: IPostCard, b: IPostCard) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt)
  })(data))

  const renderGroup = (data: {[name: string]: IPostCard[]}) => (
    Object.keys(data).map((key: string) => {
      const item: IPostCard[] = data[key]
      return (
        <div key={short.generate()} className={classes.group}>
          {renderGroupTitle(key)}
          {renderItem(item)}
        </div>
      )
    })
  )

  const renderGroupTitle = (title: string) => (
    <>
      <h2><b>{title}</b></h2>
      <hr/>
    </>
  )

  const renderItem = (data: IPostCard[]) => (
    <List 
      itemLayout="horizatal"
      dataSource={data}
      renderItem={(item: IPostCard) => (
        <p>
          <b>{generateDate(item.createdAt)}</b>
          <a href={generateLink(item._id)} className={classes.postTitle}>{item.title}</a>
        </p>
      )}
    />
  )

  const generateLink = (id: string) => `/blog?id=${id}`

  const generateDate = (date: number) => {
    try {
      const dateStr = date ? `${(new Date(date)).toLocaleDateString()}: ` : ''
      return dateStr
    } catch (err) {
      return ''
    }
  }

  return (
    <div className={classes.container}>
      {renderGroup(items)}
    </div>
  )
}

export default injectSheet({
  container: {
    width: '1000px',
    margin: '20px auto',
    backgroundColor: '#fff',
  },
  group: {
    margin: '0 20px',
    padding: '20px 0',
  },
  postTitle: {
    fontSize: '18px',
  }
})(PostList)
