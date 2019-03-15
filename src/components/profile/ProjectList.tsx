import { IComponentProps } from '@interface/index'
import { IProject } from '@interface/profile'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Button, Card, Icon } from 'antd'

interface IProjectListProps extends IComponentProps {
  data: IProject[]
}

const ProjectList = ({ classes, data }: IProjectListProps) => {

  const renderLink = (url: string) => (
    <Button
      icon="link"
      onClick={() => window.open(url)}
    >View Project</Button>
  )

  const renderItem = (title: string, content?: string) => (
    <>
      <p>
        <b>{title}: </b>{content}
      </p>
    </>
  )

  const renderListItem = ((items: IProject[]) => (
    items.map((item: IProject) => (
      <div className={classes.listItem}>
        <Card title={item.name}
              actions={[renderLink(item.link || '')]}>
          <h3>{item.time}</h3>
          {renderItem('Introduction', item.intro)}
          {renderItem('Tech Stack', item.skill)}
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
    padding: '30px 0',
    textAlign: 'left',
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