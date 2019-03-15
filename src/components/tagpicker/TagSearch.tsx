import { IBasicProps, ITag } from '@interface/index'
import service from '@services'
import {
  Select,
  Tag,
} from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

interface IProps extends IBasicProps {
  tags?: string[]
  exposeFn: (v: string[]) => void
}

const initDataSource: ITag[] = []

const TagSearch = ({ classes, tags, exposeFn }: IProps) => {
  const [dataSource, updateData] = useState(initDataSource)
  const [selectedItems, itemChange] = useState(tags || [])
  const [flag, setFlag] = useState(true)

  const renderOption = () => {
    return (
      dataSource.map(item =>
        <Select.Option key={item._id}>
          <Tag color={item.hex}>{item.name}</Tag>
        </Select.Option>
      )
    )
  }

  useEffect(() => {
    if (tags && tags.length > 0 && flag) {
      fetchSelections()
      itemChange(tags)
    }
  }, [tags])

  const onSelect = (val: string[]) => {
    itemChange(val)
    exposeFn(val)
    setFlag(false)
  }

  const fetchSelections = async () => {
    const tagResult = await service.tag.fetchAll<ITag[]>(null)
    updateData(tagResult)
  }

  return (
    <div className={classes.container}>
      <Select
        mode='multiple'
        className={classes.colorSelector}
        onChange={onSelect}
        onFocus={fetchSelections}
        value={selectedItems}
        placeholder='Select tags'
      >
        {renderOption()}
      </Select>
    </div>
  )
}

export default injectSheet({
  container: {
    marginRight: '20px',
  },
  colorSelector: {
    width: 'auo',
    minWidth: '400px',
  }
})(TagSearch)