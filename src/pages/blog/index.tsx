import { Button, Layout, message } from 'antd';
import * as hljs from 'highlight.js'
import * as MarkDown from 'markdown-it'
import { useEffect, useState } from 'react'
import * as React from 'react';
import injectSheet from 'react-jss';

import { PostCons } from '@constants'
import { ICategory, IPostCard, IRouterProps } from '@interface'
import { postState, tokenState } from '@reducers/state'
import service from '@services';
import { useDispatch, useMappedState } from 'redux-react-hook'

import 'highlight.js/styles/github.css'

const md = new MarkDown({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {console.log(__)}
    }
    return ''; // use external default escaping
  }
})

const { Header, Content} = Layout

const Blog = ({ classes, history, location }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [categoryId, updateCategory] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])
  const [title, updateTitle] = useState('')
  const [pinned, updatePinned] = useState(false)
  const [renderMarked, updateRenderMarked] = useState('')

  const { token } = useMappedState(tokenState)
  const { postSuccess } = useMappedState(postState)

  const dispatch = useDispatch()

  const fetchBlog = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
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

        updateRenderMarked(md.render(data.post || ''))
      }
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
  }, [])

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content>
        <div className={classes.container}>
          <div className={classes.entryBox}>
            <h1 className={classes.entryHeader}>{title}</h1>
          </div>

          <div className={classes.postBox}>
            <div dangerouslySetInnerHTML={{__html: renderMarked}}/>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default injectSheet({
  blogBody: {
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
  postBox: {
    padding: '50px 60px',
    maxWidth: '675px',
    margin: '24px auto',
    backgroundColor: '#fff',
  }
})(Blog)