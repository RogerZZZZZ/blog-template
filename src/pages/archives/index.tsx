import Header from '@components/header/index'
import PostList from '@components/postlist'
import TagList from '@components/taglist'
import { ICategory, IPostCard, IRouterProps, ITagFull } from '@interface/index'
import services from '@services';
import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'

const { Content } = Layout

interface IAllInfo {
  blogs: IPostCard[]
  tags: ITagFull[]
  category: ICategory[]
}

const Archives = ({ classes }: IRouterProps) => {
  const [allInfo, setAllInfo] = useState({
    blogs: [],
    tags: [],
    category: [],
  } as IAllInfo)

  const fetchInfo = async () => {
    const blogs: IPostCard[] = await services.post.fetchPinned<IPostCard[]>(null)
    const tags: ITagFull[] = await services.tag.fetchAll<ITagFull[]>(null)
    const category: ICategory[] = await services.category.fetchAll<ICategory[]>(null)

    setAllInfo({
      blogs,
      tags,
      category,
    })
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <Layout className={classes.homeBody}>
      <Header />
      <Content className={classes.container}>
        <TagList data={allInfo.tags} icon="tags" target="tag"/>
        <TagList data={allInfo.category} icon="folder" target="category"/>
        <PostList data={allInfo.blogs} />
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
    backgroundColor: '#fff',
  },
})(Archives)