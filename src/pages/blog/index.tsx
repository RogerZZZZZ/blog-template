import { AutoComplete, Button, Input, Layout, message, Switch } from 'antd';
import { useEffect, useState } from 'react'
import * as React from 'react';
import injectSheet from 'react-jss';

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { PostCons } from '@constants'
import { ICategory, IPostCard, IRouterProps } from '@interface'
import { postState, tokenState } from '@reducers/state'
import service from '@services';
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Header, Content} = Layout
const { TextArea } = Input

interface IDataSourceItem {
  value: string
  text: string
}

const Blog = ({ classes, history, location }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [categoryId, updateCategory] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])
  const [title, updateTitle] = useState('')
  const [pinned, updatePinned] = useState(false)
  const [editId, setEditId] = useState('')
  const [categories, setCategories] = useState([] as ICategory[])
  const [cateSearch, setCateSearch] = useState([] as IDataSourceItem[])

  const { token } = useMappedState(tokenState)
  const { postSuccess } = useMappedState(postState)

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
        console.log(data)
        updatePost(data.post || '')
        updateAbstract(data.abstract)
        updateTags(data.tags || [])
        updateTitle(data.title)
        updatePinned(data.pinned)
        updateCategory(data.categoryId)
      }
    }
  }

  const searchTransformer = (raw: ICategory[]): IDataSourceItem[] => {
    return raw.map(el => ({
      value: el._id,
      text: el.name,
    }))
  }

  const fetchCategories = async () => {
    const category: ICategory[] = await service.send<ICategory[]>(service.category.fetchAll, null, token || '')
    console.log(category);
    if (category) {
      setCategories(category)
      setCateSearch(searchTransformer(category))
    }
  }

  useEffect(() => {
    if (postSuccess) {
      message.success('Create or Update post successfully!')
      history.push('/admin')
      dispatch({type: PostCons.CLEAR_ACTION})
    }
  }, [postSuccess])

  useEffect(() => {
    fetchBlog()
    fetchCategories()
  }, [])

  const submitAction = () => {
    const payload = {
      post,
      abstract,
      categoryId,
      tags,
      title,
      token,
      pinned,
      id: editId,
    }
    dispatch({type: PostCons.POST_CREATE, payload})
  }

  const backAction = () => {
    history.push('/admin')
  }

  const onSearchCategory = (val: string) => {
    const data: ICategory[] = categories.filter((el: ICategory) => el.name.indexOf(val) >= 0)
    setCateSearch(searchTransformer(data))
  }

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <Layout className={classes.topBanner}>
          <Button type="primary" icon="arrow-left" onClick={backAction}>Back</Button>
        </Layout>

        <Layout className={classes.content}>
          <Input value={title} onChange={(e) => updateTitle(e.target.value)}/>
        </Layout>

        <Layout className={classes.content}>
          <AutoComplete 
            dataSource={cateSearch}
            onSelect={(val: string) => updateCategory(val)}
            onSearch={onSearchCategory}
            value={categoryId}
            placeholder="category"/>
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
  topBanner: {
    margin: '12px 24px 0 24px',
    width: '100px',
  },
  editArea: {
    backgroundColor: '#fff',
  }
})(Blog)