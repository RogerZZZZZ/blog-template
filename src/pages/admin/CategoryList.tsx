import { ICategory, IPostCard, IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import service from '@services'
import {
  Button,
  Divider,
  Icon,
  Input,
  List,
  message as Message,
  Modal,
  Popconfirm,
  Skeleton,
  Tag,
} from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

const CategoryList = ({ classes, history }: IRouterProps) => {
  const [category, setCategory] = useState([] as ICategory[])
  const [articles, setArticles] = useState([] as IPostCard[])
  const [name, setName] = useState('')
  const [curChoose, setCurChoose] = useState('')
  const [curName, setCurName] = useState('')
  const [newVisible, setNewVisible] = useState(false)
  const [fetching, setFetching] = useState(true)
  const dispatch = useDispatch()

  const { token } = useMappedState(tokenState)

  const fetchCategory = async () => {
    const categories: ICategory[] = await service.send<ICategory[]>(service.category.fetchAll, null, token || '')
    setCategory(categories)
    setFetching(false)
  }

  const fetchArticles = async (category: ICategory) => {
    const ids: string[] = category.articles
    setCurChoose(category._id)

    const posts: IPostCard[] = await service.send<IPostCard[]>(service.post.fetchByIds, {
      articles: ids.filter(v => v !== 'undefined' && v !== ''),
    }, token || '')
    setArticles(posts)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const deleteFn = async () => {
    const category: ICategory = await service.send<ICategory>(service.category.deleteById, {
      id: curChoose,
      articles: articles.map(el => el._id),
    }, token || '')
    console.log(category)
  }

  const cancelAction = () => {
    Message.info('Cancel this action.')
  }

  const editFn = (id: string) => {
    history.push('/blog?id=' + id)
  }

  const editAction = async () => {
    const category: ICategory = await service.send<ICategory>(service.category.uptCategory, {
      _id: curChoose,
      name: curName,
    }, token || '')
    if (category) {
      window.location.reload()
    }
  }

  const removeIcon = () => (
    <Popconfirm title="Are you sure delete this category?"
      onConfirm={() => deleteFn()} onCancel={cancelAction}
      okText="Confirm" cancelText="Cancel">
        <Button className={classes.editConfirmBtn} type="danger">Delete</Button>
    </Popconfirm>
  )

  const renderTags = () => (
    category.map((item: ICategory) => {
      item.articles = item.articles.filter(v => v !== 'undefined' && v !== '')
      return (
        <Tag key={item._id} onClick={() => fetchArticles(item)}>
          {item.name + `(${item.articles.length})`}
        </Tag>
      )
    })
  )

  const createCategory = async () => {
    const data = await service.send(service.category.create, {
      name
    }, token || '')
    if (data) {
      closeModal()
      fetchCategory()
    }
  }

  const renderEditArea = () => (
    !!curChoose
      ? (
        <div className={classes.editArea}>
          <Input className={classes.categoryNameInput} placeholder="Input category name" value={curName} onChange={(e) => setCurName(e.target.value)}/>

          <Button className={classes.editConfirmBtn} onClick={editAction}>Edit</Button>
          {removeIcon()}
        </div>
      ) : <div />
  )

  const closeModal = () => setNewVisible(false)

  const renderCategoryList = () => {
    return (
      fetching
        ? <Skeleton />
        : <List
            itemLayout="vertical"
            pagination={{
              pageSize: 10,
            }}
            dataSource={articles}
            renderItem={(item:IPostCard) => (
              <List.Item key={item._id}>
                <List.Item.Meta title={item.title}/>
                {item.abstract}
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

      <div className={classes.displayBanner}>
        <div className={classes.tagList}>
          {renderTags()}
        </div>
        {renderEditArea()}
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
  displayBanner: {
    display: 'flex',
    flexDirection: 'row',
  },
  tagList: {
    width: '50%',
    minWidth: '500px',
  },
  editArea: {
    width: '50%',
    minWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
  },
  categoryNameInput: {
    width: '200px',
    marginBottom: '10px'
  },
  editConfirmBtn: {
    marginTop: '10px',
    width: '100px',
  }
})(CategoryList)