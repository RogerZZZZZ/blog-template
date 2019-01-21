import { ICategory, IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import service from '@services'
import { Button, Divider, Icon, Input, List, message as Message, Modal, Popconfirm, Skeleton } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const CategoryList = ({ classes, history }: IRouterProps) => {
  const [category, setCategory] = useState([] as ICategory[])
  const [name, setName] = useState('')
  const [curChoose, setCurChoose] = useState('')
  const [newVisible, setNewVisible] = useState(false)
  const [fetching, setFetching] = useState(true)
  const dispatch = useDispatch()

  const { token } = useMappedState(tokenState)

  const fetchCategory = async () => {
    const categories: ICategory[] = await service.send<ICategory[]>(service.category.fetchAll, null, token || '')
    setCategory(categories)
    setFetching(false)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const deleteFn = (id: string) => {
    setCurChoose(id)
    const payload = {
      id,
      token,
    }
    // dispatch({type: PostCons.DELETE_POST, payload})
  }

  const cancelAction = () => {
    Message.info('Cancel this action.')
  }

  const editFn = (id: string) => {
    history.push('/blog?id=' + id)
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

  const createCategory = () => {
    console.log('create category')

  }

  const closeModal = () => setNewVisible(false)

  const renderCategoryList = () => {
    return (
      fetching
        ? <Skeleton />
        : <List
            itemLayout="verticle"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page)
              },
              pageSize: 10,
            }}
            dataSource={category}
            renderItem={(item: ICategory) => (
              <List.Item key={item._id}>
                <List.Item.Meta title={item.name}/>
              </List.Item>
            )}
          />
    )
  }

  const renderModal = () => {
    return (
      <Modal
        visible={newVisible}
        title="Choose tag"
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>Back</Button>,
          <Button key="submit" type="primary" loading={false} onClick={createCategory}>
            Create
          </Button>,
        ]}
      >
        <Input placeholder='Input new tag name' value={name}
          onChange={(e) => setName(e.target.value)}/>
      </Modal>
    )
  }

  return (
    <div>
      <div className={classes.topBanner}>
        <h2>Category List</h2>
        <div>
          <Button type="primary" icon="plus" onClick={() => setNewVisible(true)}>New Category</Button>
          {renderModal()}
        </div>
      </div>

      <Divider orientation="left">Articles List</Divider>

      {renderCategoryList()}
    </div>
  )
}

export default injectSheet({
  topBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})(CategoryList)