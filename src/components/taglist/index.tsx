import Flex from '@components/common/Flex' 
import { ICommonTag, IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Icon, Tag } from 'antd'

interface ITagListProp extends IComponentProps {
  data: ICommonTag[]
  icon: string
  target: string
}

const TagList = ({ classes, data, icon, target }: ITagListProp) => {

  const renderTags = () => (
    data.map((item: ICommonTag) => {
      item.articles = item.articles.filter(v => v !== 'undefined' && v !== '')
      return (
        <Tag color={item.hex || '#ccc'} key={item._id}
            style={{ fontSize: '14px', borderStyle: 'dashed' }} 
            onClick={() => window.location.href = `/${target}?id=${item._id}`}>
          {item.name + `(${item.articles.length})`}
        </Tag>
      )
    })
  )

  return (
    <div className={classes.container}>
      <Flex>
        <Flex width={100}>
          <Icon type={icon} style={{ fontSize: '20px' }}/>
        </Flex>

        {renderTags()}
      </Flex>
    </div>
  )
}

export default injectSheet({
  container: {
    padding: '40px 40px 20px 40px',
  }
})(TagList)

