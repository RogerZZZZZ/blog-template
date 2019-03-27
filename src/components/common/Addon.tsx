import { IComponentProps } from '@interface/index'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'
import short from 'short-uuid'

import {
  Button,
  Divider,
} from 'antd'

interface IAddonProps extends IComponentProps {
  data: any[],
  onChange: any,
}

const addonHOC = (template: any) => {
  const Addon = ({ children, classes, data, onChange }: IAddonProps) => {
    const [items, setItems] = useState(data.length < 1 ? [{}] : data)

    const removetItem = (idx: number) => {
      items.splice(idx, 1)
      setItems(items)
      onChange(items)
    }

    const updateItem = (idx: number, value: any) => {
      items[idx] = value
      onChange(items)
    }

    const addTemplate = () => {
      items.push({})
      setItems(items)
      onChange(items)
    }

    const renderList = () => (
      (items || [{}]).map((item, idx) => (
        <div key={short.generate()}>
          <div className={classes.item}>
            {template(Object.assign({
              data: item,
              onChange: updateItem,
              idx,
            }))}
            {items.length > 1 ?
            <Button shape="circle" 
                    icon="delete"
                    onClick={() => removetItem(idx)}/>
            : null}
          </div>
          <Divider />
        </div>
      ))
    )

    return (
      <div>
        {renderList()}
        <Button onClick={addTemplate} icon="plus" type="primary" />
      </div>
    )
  }

  return injectSheet({
    item: {
      margin: '10px 0',
      display: 'flex',
      justifyContent: 'space-between',
    }
  })(Addon)
}

export default addonHOC