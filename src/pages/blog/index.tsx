import * as React from 'react'
import injectSheet from 'react-jss'
import IProps from '../../@interface/InjectStyle'

import { 
  Layout,
  Input,
} from 'antd'

const { TextArea } = Input
const { Header, Content} = Layout

const Blog = ({ classes }: IProps) => {



  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <TextArea className={classes.content}/>

        <div className={classes.resizer}/>

        <TextArea className={classes.content}/>

      </Content>
    </Layout>
  )
}

export default injectSheet({
  blogBody: {
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: '#e8e8e8',
  },
  container: {
    display: 'flex',
    padding: '0 50px',
    height: '100%',
    margin: '24px auto',
    width: '100%',
  },
  content: {
    flex: '1 1 0',
    flexGrow: 1,
    flexShrink: 1,
    padding: '0 20px',
    minWidth: '500px',
    height: '100%',
  },
  resizer: {
    position: 'relative',
    display: 'flex',
    flex: '0 0',
    padding: '2px',
    background: 'orange',
    cursor: 'col-resize',
    userSelect: 'none',
  }
})(Blog)