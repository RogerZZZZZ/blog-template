import Header from '@components/header/index'
import PostList from '@components/postlist'
import { ICategory, IPostCard, IRouterProps } from '@interface/index'
import service from '@services'
import { Layout } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

const { Content } = Layout

const Category = ({ classes, location }: IRouterProps) => {
  const [category, setCategory] = useState({} as ICategory)
  const [articles, setArticles] = useState([] as IPostCard[])

  const fetchCategory = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      const value: ICategory = await service.category.fetchById<ICategory>({id})
      if (value) {
        setCategory(value)
        fetchArticles(value)
      }
    }
  }

  const fetchArticles = async (category: ICategory) => {
    const ids: string[] = category.articles
    const posts: IPostCard[] = await service.post.fetchByIds<IPostCard[]>({
      articles: ids.filter(v => v !== 'undefined' && v !== ''),
    })
    setArticles(posts)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <Layout className={classes.homeBody}>
      <Header />
        <Content className={classes.container}>
          <h2><b>{category.name}</b></h2>
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
})(Category)