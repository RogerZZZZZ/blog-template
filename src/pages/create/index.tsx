import Flex from '@components/common/Flex'
import NumericInput from '@components/common/NumericInput'
import UploadBtn from '@components/common/UploadBtn'
import Header from '@components/header/index'
import InputTitleWrapper from '@components/profile/InputTitleWrapper'
import { AutoComplete, Button, Input, Layout, message, Switch } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'

import MarkDownEditor from '@components/markdown'
import TagPicker from '@components/tagpicker'
import { PostCons } from '@constants'
import { ICategory, IPostCard, IRouterProps } from '@interface/index'
import { postState } from '@reducers/state'
import service from '@services'
import { useDispatch, useMappedState } from 'redux-react-hook'

const { Content} = Layout
const { TextArea } = Input

interface IDataSourceItem {
  value: string
  text: string
}

const BlogCreate = ({ classes, history, location }: IRouterProps) => {

  const [post, updatePost] = useState('')
  const [categoryId, updateCategory] = useState('')
  const [abstract, updateAbstract] = useState('')
  const [tags, updateTags] = useState<string[]>([])
  const [title, updateTitle] = useState('')
  const [pinned, updatePinned] = useState(false)
  const [open, setOpen] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [editId, setEditId] = useState('')
  const [categories, setCategories] = useState([] as ICategory[])
  const [cateSearch, setCateSearch] = useState([] as IDataSourceItem[])

  const { postSuccess } = useMappedState(postState)

  const dispatch = useDispatch()

  const fetchBlog = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      setEditId(id)
      const data: IPostCard = await service.post.fetchById<IPostCard>({id})
      if (data) {
        updatePost(data.post || '')
        updateAbstract(data.abstract)
        updateTags(data.tags || [])
        updateTitle(data.title)
        updatePinned(data.pinned)
        updateCategory(data.categoryId)
        setOpen(data.open || false)
        setMinutes(data.minutes || 0)
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
    const category: ICategory[] = await service.category.fetchAll<ICategory[]>(null)
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
      open,
      title,
      minutes,
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
      <Header />

      <Content className={classes.container}>
        <Layout className={classes.topBanner}>
          <Button type="primary" icon="arrow-left" onClick={backAction}>Back</Button>
        </Layout>

        <Layout className={classes.content}>
          <Flex direction="column">
            <Flex>
              <UploadBtn />
            </Flex>

            <Flex>
              <InputTitleWrapper title="Title">
                <Input value={title} onChange={(e) => updateTitle(e.target.value)}/>
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Pinned">
                <Switch checkedChildren="Pinned" 
                        unCheckedChildren="Unpinned"
                        checked={pinned} 
                        onChange={updatePinned} />
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Show or Not">
                <Switch checkedChildren="Show" 
                        unCheckedChildren="Hide" 
                        onChange={setOpen}
                        checked={open} />
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Category">
                <AutoComplete 
                  dataSource={cateSearch}
                  onSelect={(val: string) => updateCategory(val)}
                  onSearch={onSearchCategory}
                  value={categoryId}
                  placeholder="category"/>
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Tags">
                <TagPicker editable exposeFn={updateTags} tags={tags}/>
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Abstract">
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} 
                          value={abstract}
                          style={{ width: 800 }}
                          onChange={(e) => updateAbstract(e.target.value)}/>
              </InputTitleWrapper>
            </Flex>

            <Flex>
              <InputTitleWrapper title="Time to read">
                <NumericInput value={minutes}
                              addonAfter="minutes"
                              onChange={setMinutes}/>
              </InputTitleWrapper>
            </Flex>

            <MarkDownEditor exposeFn={updatePost} value={post}/>

          </Flex>
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
    backgroundColor: '#fff'
  },
  topBanner: {
    margin: '12px 24px 0 24px',
    width: '100px',
  },
})(BlogCreate)