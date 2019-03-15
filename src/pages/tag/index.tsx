import Header from '@components/header/index'
import PostList from '@components/postlist'
import { IPostCard, IRouterProps, ITagFull } from '@interface/index'
import services from '@services'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

const { Content } = Layout

const Tag = ({ classes, location }: IRouterProps) => {
  const [tag, setTag] = useState({} as ITagFull)
  const [articles, setArticles] = useState([] as IPostCard[])

  const fetchTag = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      const value: ITagFull = await services.tag.fetchById<ITagFull>({id})
      if (value) {
        setTag(value)
        fetchArticles(value)
      }
    }
  }

  const fetchArticles = async (tag: ITagFull) => {
    const ids: string[] = tag.articles
    const posts: IPostCard[] = await services.post.fetchByIds<IPostCard[]>({
      articles: ids.filter(v => v !== 'undefined' && v !== ''),
    })
    setArticles(posts)
  }

  useEffect(() => {
    fetchTag()
  }, [])

  return (
    <Layout className={classes.homeBody}>
      <Header />
        <Content className={classes.container}>
          <h2><b>{tag.name}</b></h2>
          <PostList data={articles} />
        </Content>
    </Layout>
  )
}

export default injectSheet({
  homeBody: {
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#e8e8e8',
  },
  container: {
    width: '1000px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#fff',
  },
})(Tag)