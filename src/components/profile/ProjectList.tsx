import { IComponentProps } from '@interface/index'
import { IProject } from '@interface/profile'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Card, Icon } from 'antd'

interface IProjectListProps extends IComponentProps {
  data: IProject[]
}

const ProjectList = ({ classes, data }: IProjectListProps) => {

  const renderListItem = ((items: IProject[]) => (
    items.map((item: IProject) => (
      <div className={classes.listItem}>
        <Card title={item.name}>
          <p>{item.time}</p>
          <p>{item.intro}</p>
          <p>{item.skill}</p>
          <p>{item.link}</p>
        </Card>
      </div>
    ))
  ))

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {renderListItem(data)}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    backgroundColor: '#e8e8e8',
    padding: '30px 0'
  },
  list: {
    position: 'relative',
    margin: '0 auto',
    width: '600px',
  },
  listItem: {
    marginBottom: "30px",
  }
})(ProjectList)