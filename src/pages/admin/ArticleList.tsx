import { PostCons } from '@constants'
import { IPostCard, IRouterProps } from '@interface/index'
import { postState } from '@reducers/state'
import service from '@services'
import { Button, Icon, List, message as Message, Popconfirm, Skeleton, Spin } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const ArticleList = ({ classes, history }: IRouterProps) => {

  const [blogs, setBlogs] = useState([] as IPostCard[])
  const [curDlt, setCurDlt] = useState('')
  const [fetching, setFetching] = useState(true)
  const dispatch = useDispatch()

  const { deleteSuccess, doing, message } = useMappedState(postState)

  const fetchBlog = async () => {
    const blogs: IPostCard[] = await service.post.fetchAllInternal<IPostCard[]>(null)
    setBlogs(blogs)
    setFetching(false)
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  useEffect(() => {
    if (deleteSuccess && curDlt !== '') {
      setBlogs(blogs.filter(v => v._id !== curDlt))
      Message.success('Successfully delete this article!')
      setCurDlt('')
      dispatch({type: PostCons.CLEAR_ACTION})
    }
  }, [deleteSuccess])

  useEffect(() => {
    if (!!message) {
      Message.error(message)
    }
  }, [message])

  const editFn = (id: string) => {
    history.push('/new?id=' + id)
  }

  const deleteFn = (id: string) => {
    setCurDlt(id)
    const payload = {
      id,
    }
    dispatch({type: PostCons.DELETE_POST, payload})
  }

  const cancelAction = () => {
    Message.info('Cancel this action.')
  }

  const createPost = () => {
    history.push('/new')
  }

  const removeIcon = (id: string) => (
    <Popconfirm title="Are you sure delete this post?"
      onConfirm={() => deleteFn(id)} onCancel={cancelAction}
      okText="Confirm" cancelText="Cancel">
      <span>
        <Icon type="delete" style={{ marginRight: 8 }} />
        Remove
      </span>
    </Popconfirm>
  )

  const editIcon = (id: string) => (
    <span onClick={() => editFn(id)}>
      <Icon type="edit" style={{ marginRight: 8 }} />
      Edit
    </span>
  )

  const loadingIcon = (id: string) => (
    doing && curDlt === id 
      ? <Spin />
      : <span />
  )

  const renderBlogList = (datas: IPostCard[]) => {
    return (
      fetching
        ? <Skeleton />
        : <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 5,
          }}
          dataSource={datas}
          renderItem={(item: IPostCard) => (
            <List.Item
              actions={[
                editIcon(item._id),
                removeIcon(item._id),
                loadingIcon(item._id),
              ]}
              key={item._id}>
              <List.Item.Meta
                title={<a>{item.title}</a>} />
              {item.abstract}
            </List.Item>
          )}
        />
    )
  }

  return (
    <div>
      <div className={classes.topBanner}>
        <h2>Post List</h2>
        <div>
          <Button type="primary" icon="plus" onClick={createPost}>New Post</Button>
        </div>
      </div>
      {renderBlogList(blogs)}
    </div>
  )
}

export default injectSheet({
  topBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})(ArticleList)