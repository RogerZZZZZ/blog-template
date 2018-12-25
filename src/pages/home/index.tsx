import * as React from 'react'
import injectSheet from 'react-jss'
import IProps, { IPostCardProps } from '../../@interface/InjectStyle'
import PostCard from '../../components/PostCard'

import { 
  Layout,
} from 'antd'

const { Header, Content} = Layout

const mockData: IPostCardProps[] = [{
  abstract: 'I have hundreds of files and folders in my dotfiles repo, and nearly 1000 commits—there are quite a few hidden gems buried in there that generally don’t get to see the light of day. Rather than wander aimlessly through them, let me give you the guided tour.',
  title: 'Noteworthy Dotfile Hacks',
  tid: 1,
  createTime: 1545751566244,
  pinned: true,
}, {
  abstract: 'I’ve written in the past (twice) about how to streamline the writing process when using LaTeX. Since then, I’ve found that I enjoy writing even more when I don’t have to reach for LaTeX at all. By reaching first for Markdown, then for LaTeX when necessary, writing is easier and more enjoyable.',
  title: 'Reach for Markdown, not LaTeX',
  tid: 2,
  createTime: 1545751566244,
  pinned: false,
}]

const Home = ({ classes }: IProps) => {
  
  const title = 'Work In Progress'
  const author = 'RogerZZZZ'

  const renderPostCard = (datas: IPostCardProps[]) => {
    return (
      datas.map((data: IPostCardProps) => 
        <PostCard {...data} />
      )
    )
  }
  return (
    <Layout className={classes.homeBody}>
      <Header>Header</Header>
      <Content>
        <div className={classes.container}>
          <div className={classes.entryBox}>
            <h1 className={classes.entryHeader}>{title}</h1>
            <h2 className={classes.entrySubHeader}>{author}</h2>
          </div>

          <div className={classes.postBox}>
          {renderPostCard(mockData)}
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default injectSheet({
  homeBody: {
    width: '100%',
    height: '100vh',
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