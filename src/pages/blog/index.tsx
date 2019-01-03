import { Input, Layout } from 'antd';
import * as React from 'react';
import injectSheet from 'react-jss';

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { IRouterProps } from '@interface'

const { Header, Content} = Layout
const { TextArea } = Input

const Blog = ({ classes }: IRouterProps) => {

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <Layout className={classes.content}>
          <div className={classes.editArea}>
            <TagPicker editable/>
          </div>
        </Layout>

        <Layout className={classes.content}>
          <TextArea autosize={false} />
        </Layout>

        <Layout className={classes.content}>
          <MarkDownEditor />
        </Layout>
      </Content>
    </Layout>
  )
}

export default injectSheet({
  blogBody: {
    width: '100%',
    height: 'auto',
    margin: 0,
    padding: 0,
    backgroundColor: '#e8e8e8',
  },
  container: {
    display: 'flex',
    height: '100%',
    margin: '24px 50px',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  content: {
    margin: '24px',
  },
  editArea: {
    backgroundColor: '#fff',
  }
})(Blog)