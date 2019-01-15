import { Button, Input, Layout, Switch } from 'antd';
import { useEffect, useState } from 'react'
import * as React from 'react';
import injectSheet from 'react-jss';

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { PostCons } from '@constants'
import { IPostCard, IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import service from '@services';
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Header, Content} = Layout
const { TextArea } = Input

const Blog = ({ classes, location }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])
  const [title, updateTitle] = useState('')
  const [pinned, updatePinned] = useState(false)
  const [editId, setEditId] = useState('')

  const { token } = useMappedState(tokenState)

  const dispatch = useDispatch()

  const fetchBlog = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      setEditId(id)
      const data: IPostCard = await service.send<IPostCard>(service.post.fetchById, {
        id,
      }, token || '')
      if (data) {
        updatePost(data.post || '')
        updateAbstract(data.abstract)
        updateTags(data.tags || [])
        updateTitle(data.title)
        updatePinned(data.pinned)
      }
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  const submitAction = () => {
    const payload = {
      post,
      abstract,
      tags,
      title,
      token,
      pinned,
      id: editId,
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
            <TagPicker editable exposeFn={updateTags} tags={tags}/>
          </div>
        </Layout>

        <Layout className={classes.content}>
          <div className={classes.editArea}>
            <Switch checkedChildren="Pinned" unCheckedChildren="Unpinned"
              checked={pinned} onChange={updatePinned}/>
          </div>
        </Layout>

        <Layout className={classes.content}>
          <TextArea autosize={false} value={abstract} onChange={(e) => updateAbstract(e.target.value)}/>
        </Layout>

        <Layout className={classes.content}>
          <MarkDownEditor exposeFn={updatePost} value={post}/>
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