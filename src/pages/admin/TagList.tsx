import { IPostCard, IRouterProps, ITagFull } from '@interface'
import { tokenState } from '@reducers//state';
import services from '@services';
import { Divider, List, Tag } from 'antd';
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const TagList = ({ classes }: IRouterProps) => {
  const [tags, setTags] = useState([] as ITagFull[])
  const [articles, setArticles] = useState([] as IPostCard[])

  const { token } = useMappedState(tokenState)

  const fetchTags = async () => {
    const tags: ITagFull[] = await services.send<ITagFull[]>(services.tag.fetchAll, null, token || '')
    setTags(tags)
  }

  const fetchArticles = async (ids: string[]) => {
    const posts: IPostCard[] = await services.send<IPostCard[]>(services.post.fetchByIds, {
      articles: ids.filter(v => v !== 'undefined' && v !== ''),
    }, token || '')
    setArticles(posts)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const renderTags = () => (
    tags.map((item: ITagFull) => {
      const articles = item.articles.filter(v => v !== 'undefined' && v !== '')
      return (
        <Tag color={item.hex} key={item._id} onClick={() => fetchArticles(articles)}>
          {item.name + `(${articles.length})`}
        </Tag>
      )
    })
  )

  return (
    <div>
      <div className={classes.topBanner}>
        <h2>Tag List</h2>
      </div>
      {renderTags()}

      <Divider orientation="left">Article List</Divider>

      <List
        itemLayout="vertical"
        pagination={{
          pageSize: 10,
        }}
        dataSource={articles}
        renderItem={(item:IPostCard) => (
          <List.Item key={item._id}>
            <List.Item.Meta title={item.title}/>
            {item.abstract}
          </List.Item>
        )}
      />
    </div>
  )
}

export default injectSheet({
  topBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})(TagList)