import { IPostCard, IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import service from '@services';
import { Button, Icon, Layout, List, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import * as React from 'react'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

const ArticleList = ({ classes }: IRouterProps) => {

  const [blogs, setBlogs] = useState([] as IPostCard[])
  const [fetching, setFetching] = useState(true)

  const { token } = useMappedState(tokenState)

  const fetchBlog = async () => {
    const blogs: IPostCard[] = await service.send<IPostCard[]>(service.post.fetchAll, null, token || '')
    setBlogs(blogs)
    setFetching(false)
  }

  useEffect(() => {
    fetchBlog()
  }, [])

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
              key={item._id}>
              <List.Item.Meta 
                title={<a>{item.title}</a>}/>
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