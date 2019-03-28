import { BackTop, Icon, Layout, Tag } from 'antd'
import * as hljs from 'highlight.js'
import * as MarkDown from 'markdown-it'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'

import Header from '@components/header/index'
import { ICategory, IPostCard, IRouterProps, ITag } from '@interface/index'
import service from '@services'

import 'highlight.js/styles/github.css'

const md = new MarkDown({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {console.log(__)}
    }
    return '' // use external default escaping
  }
})

const { Content } = Layout

const Blog = ({ classes, history, location }: IRouterProps) => {

  const [category, setCategory] = useState({} as ICategory)
  const [abstract, updateAbstract] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [title, updateTitle] = useState('')
  const [minutes, setMinutes] = useState(0)
  const [pinned, updatePinned] = useState(false)
  const [renderMarked, updateRenderMarked] = useState('')

  const fetchBlog = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      const data: IPostCard = await service.post.fetchById<IPostCard>({id})
      if (data) {
        updateAbstract(data.abstract)
        updateTitle(data.title)
        updatePinned(data.pinned)
        setMinutes(data.minutes || 0)

        fetchCategory(data.categoryId || '')
        fetchTags(data.tags || [])

        updateRenderMarked(md.render(data.post || ''))
      }
    }
  }

  const fetchTags = async (ids: string[]) => {
    if (ids.length > 0) {
      service.tag.fetchByIds<ITag[]>({ids})
        .then((data: ITag[]) => {
          setTags(data)
        })
    }
  }

  const fetchCategory = async (id: string) => {
    if (id) {
      service.category.fetchById<ICategory>({id})
      .then((data: ICategory) => {
        setCategory(data)
      })
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])


  const renderTags = () => (
     tags.length > 0 ?
      tags.map((item: ITag) => (
        <Tag color={item.hex} key={item._id}>
          {item.name}
        </Tag>
      ))
      : <div />
  )

  const renderTime = () => (
    !!minutes ?
      Array.from({length: Math.ceil(minutes / 10)}).map((el, idx) => <Icon type="coffee" key={idx}/>)
    : <div />
  )

  return (
    <Layout className={classes.blogBody}>
      <Header />

      <Content>
        <div className={classes.container}>
          <div className={classes.entryBox}>
            <h1 className={classes.entryHeader}>{title}</h1>
          </div>

          <div className={classes.postBox}>
            <div className={classes.abstractBox}>
              <div>
                {renderTags()}
              </div>
              <span>
                {renderTime()}
                {minutes} mins read
              </span>
            </div>
            {abstract}
            <div dangerouslySetInnerHTML={{__html: renderMarked}}/>
          </div>
        </div>
      </Content>

      <BackTop />
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
    maxWidth: '800px',
    margin: '24px auto',
    backgroundColor: '#fff',
  },
  abstractBox: {
    marginBottom: '5px',
  }
})(Blog)