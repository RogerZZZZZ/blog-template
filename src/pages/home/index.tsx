import Header from '@components/header/index'
import PostCard from '@components/postcard'
import { IPostCard, IRouterProps } from '@interface/index'
import services from '@services'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Layout, Skeleton } from 'antd'

const { Content } = Layout

const Home = ({ classes }: IRouterProps) => {
  
  const title = 'Work In Progress'
  const author = 'RogerZZZZ'
  

  const [pinnedBlog, updatePinnedBlog] = useState([] as IPostCard[])
  const [fetching, updateFetching] = useState(true)

  const fetchBlog = async () => {
    const blogs: IPostCard[] = await services.post.fetchPinned<IPostCard[]>(null)
    updatePinnedBlog(blogs)
    updateFetching(false)
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  const renderPostCard = (datas: IPostCard[]) => {
    return (
      fetching
        ? <Skeleton />
        : datas.map((data: IPostCard, idx: number) => 
            <PostCard {...data} key={idx}/>
          )
    )
  }
  return (
    <Layout className={classes.homeBody}>
      <Header />
      <Content>
        <div className={classes.container}>
          <div className={classes.entryBox}>
            <h1 className={classes.entryHeader}>{title}</h1>
            <h2 className={classes.entrySubHeader}>{author}</h2>
          </div>

          <div className={classes.postBox}>
            {renderPostCard(pinnedBlog)}
          </div>
        </div>
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
    margin: '24px auto',
  },
  entryBox: {
    textAlign: 'center',
    margin: '24px auto'    
  },
  entryHeader: {
    color: '#555',
    fontSize: '3.75rem',
    fontWeight: 400,
  },
  entrySubHeader: {
    fontSize: '1.875rem',
    color: '#888'
  },
})(Home)