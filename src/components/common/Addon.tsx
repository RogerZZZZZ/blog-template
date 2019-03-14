import { IComponentProps } from '@interface/index'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

import {
  Button
} from 'antd'

interface IAddonProps extends IComponentProps {
  data: any[],
  defaultValue: any,
  onChange: any,
}

const addonHOC = (template: any) =>
  injectSheet({
    item: {
      margin: '10px 0',
      display: 'flex',
      justifyContent: 'space-between',
    }
  })(({ children, classes, data, defaultValue, onChange }: IAddonProps) => {
    const [items, setItems] = useState(data.length < 1 ? [defaultValue] : data)

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
      items.push(Object.assign({}, defaultValue))
      setItems(items)
      onChange(items)
    }

    const renderList = () => (
      (items || [{}]).map((item, idx) => (
        <div key={idx} className={classes.item}>
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
      ))
    )

    return (
      <div>
        {renderList()}
        <Button onClick={addTemplate} icon="plus" type="primary" />
      </div>
    )
})

export default addonHOC