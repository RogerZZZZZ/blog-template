import { Button, Input, Layout } from 'antd';
import { useState } from 'react'
import * as React from 'react';
import injectSheet from 'react-jss';

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { IRouterProps } from '@interface'

const { Header, Content} = Layout
const { TextArea } = Input

const Blog = ({ classes }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])

  const submitAction = () => {
    console.log('click')
    console.log(post)
    console.log(abstract)
    console.log(tags)
  }

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <Layout className={classes.content}>
          <div className={classes.editArea}>
            <TagPicker editable exposeFn={updateTags}/>
          </div>
        </Layout>

        <Layout className={classes.content}>
          <TextArea autosize={false} onChange={(e) => updateAbstract(e.target.value)}/>
        </Layout>

        <Layout className={classes.content}>
          <MarkDownEditor exposeFn={updatePost}/>
        </Layout>

        <Layout className={classes.content}>
          <Button onClick={submitAction} type="primary">Submit</Button>
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