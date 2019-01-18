import { IPostCard, IRouterProps, ITag, ITagFull } from '@interface'
import { tokenState } from '@reducers//state';
import services from '@services';
import { Button, Divider, Input, List, Tag } from 'antd';
import * as React from 'react'
import { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

const TagList = ({ classes }: IRouterProps) => {
  const [tags, setTags] = useState([] as ITagFull[])
  const [articles, setArticles] = useState([] as IPostCard[])
  const [curId, setCurId] = useState('')
  const [curHex, setCurHex] = useState('#000')
  const [curName, setCurName] = useState('')

  const { token } = useMappedState(tokenState)

  const fetchTags = async () => {
    const tags: ITagFull[] = await services.send<ITagFull[]>(services.tag.fetchAll, null, token || '')
    setTags(tags)
  }

  const fetchArticles = async (tag: ITagFull) => {
    const ids: string[] = tag.articles

    setCurId(tag._id)
    setCurName(tag.name)
    setCurHex(tag.hex)

    const posts: IPostCard[] = await services.send<IPostCard[]>(services.post.fetchByIds, {
      articles: ids.filter(v => v !== 'undefined' && v !== ''),
    }, token || '')
    setArticles(posts)
  }

  const eidtAction = async () => {
    const tag: ITagFull = await services.send<ITagFull>(services.tag.updateTag, {
      _id: curId,
      name: curName,
      hex: curHex,
    }, token || '')
    if (tag) {
      setCurId('')
      window.location.reload()
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])
  
  const renderTags = () => (
    tags.map((item: ITagFull) => {
      const articles = item.articles.filter(v => v !== 'undefined' && v !== '')
      return (
        <Tag color={item.hex} key={item._id} 
            onClick={() => fetchArticles(item)}>
          {item.name + `(${articles.length})`}
        </Tag>
      )
    })
  )

  const renderEditArea = () => (
    !!curId
      ? ( <div className={classes.editArea}>
      <Input className={classes.tagNameInput} placeholder='Input new tag name' value={curName}
        onChange={(e) => setCurName(e.target.value)}/>
      <div className={classes.colorSelect}>
        <TwitterPicker triangle="hide" color={curHex}
          onChangeComplete={(color) => setCurHex(color.hex)}/>
      </div>
      <Button className={classes.tagEditConfirm} onClick={eidtAction} type="primary">
        Confirm
      </Button>
    </div>
    ) : <div />
  )

  return (
    <div>
      <div className={classes.topBanner}>
        <h2>Tag List</h2>
      </div>

      <div className={classes.displayBanner}>
        <div className={classes.tagList}>
          {renderTags()}
        </div>
        {renderEditArea()}
      </div>

      <Divider orientation="left">Article List</Divider>

      <List
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
    justifyItems: 'center'
  },
  tagNameInput: {
    width: '200px',
    marginBottom: '10px'
  },
  tagEditConfirm: {
    marginTop: '10px',
    width: '200px',
  }
})(TagList)