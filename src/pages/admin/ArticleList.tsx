import { PostCons } from '@constants';
import { IPostCard, IRouterProps } from '@interface'
import { postState, tokenState } from '@reducers/state'
import service from '@services';
import { Icon, List, message as Message, Popconfirm, Skeleton, Spin } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const ArticleList = ({ classes }: IRouterProps) => {

  const [blogs, setBlogs] = useState([] as IPostCard[])
  const [fetching, setFetching] = useState(true)
  const dispatch = useDispatch()

  const { token } = useMappedState(tokenState)
  const { doing, message } = useMappedState(postState)

  const fetchBlog = async () => {
    const blogs: IPostCard[] = await service.send<IPostCard[]>(service.post.fetchAll, null, token || '')
    setBlogs(blogs)
    setFetching(false)
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  useEffect(() => {
    if (!!message) {
      Message.error(message)
    }
    console.log('message change')
  }, [message])

  const editFn = (id: string) => {
    console.log(id)
  }

  const deleteFn = (id: string) => {
    console.log(id)
    const payload = {
      id,
      token,
    }
    dispatch({type: PostCons.DELETE_POST, payload})
    Message.success('Successfully delete this article!')
  }

  const cancelAction = () => {
    Message.info('Cancel this action.')
  }

  const remvoeIcon = (id: string) => (
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

  const loadingIcon = () => (
    doing
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
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={datas}
          renderItem={(item: IPostCard) => (
            <List.Item
              actions={[
                editIcon(item._id),
                remvoeIcon(item._id),
                loadingIcon(),
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
      <span>Post List</span>
      {renderBlogList(blogs)}
    </div>
  )
}

export default injectSheet({

})(ArticleList)