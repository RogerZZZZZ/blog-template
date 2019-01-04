import { Button, Input, Layout, Switch } from 'antd';
import { useState } from 'react'
import * as React from 'react';
import injectSheet from 'react-jss';

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { PostCons } from '@constants'
import { IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Header, Content} = Layout
const { TextArea } = Input

const Blog = ({ classes }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])
  const [title, updateTitle] = useState('')
  const [pinned, updatePinned] = useState(false)

  const { token } = useMappedState(tokenState)

  const dispatch = useDispatch()

  const submitAction = () => {
    const payload = {
      post,
      abstract,
      tags,
      title,
      token,
      pinned,
    }
    dispatch({type: PostCons.POST_CREATE, payload})
  }

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <Layout className={classes.content}>
          <Input value={title} onChange={(e) => updateTitle(e.target.value)}/>
        </Layout>

        <Layout className={classes.content}>
          <div className={classes.editArea}>
            <TagPicker editable exposeFn={updateTags}/>
          </div>
        </Layout>

        <Layout className={classes.content}>
          <div className={classes.editArea}>
            <Switch checkedChildren="Pinned" unCheckedChildren="Unpinned"
              checked={pinned} onChange={updatePinned}/>
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