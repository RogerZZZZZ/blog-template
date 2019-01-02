import {
  Select,
  Tag,
} from 'antd'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

interface IProps {
  classes?: any,
  tags: ITag[]
}

interface ITag {
  name: string
  hex: string
  tagId: string
}

const tagsDatasource: ITag[] = [{
  name: 'test-tags',
  hex: '#654321',
  tagId: '1'
}, {
  name: 'tesat-tags-2',
  hex: '#123456',
  tagId: '2'
}, {
  name: 'tesat-tags-3',
  hex: '#123456',
  tagId: '3'
}]

const ColorSearch = ({ classes, tags }: IProps) => {
  const [dataSource, updateData] = useState(tagsDatasource)
  const [selectedItems, itemChange] = useState(tags.map(tag => tag.tagId))

  const renderOption = () => {
    return (
      dataSource.map(item =>
        <Select.Option key={item.tagId}>
          <Tag color={item.hex}>{item.name}</Tag>
        </Select.Option>
      )
    )
  }

  const onSelect = (val: any) => {
    console.log(val)
    itemChange(val)
  }

  return (
    <div>
      <Select
        mode='multiple'
        className={classes.colorSelector}
        onChange={onSelect}
        value={selectedItems}
        placeholder='Select tags'
      >
        {renderOption()}
      </Select>
    </div>
  )
}

export default injectSheet({
  colorSelector: {
    width: 'auo',
    minWidth: '400px',
  }
})(ColorSearch)