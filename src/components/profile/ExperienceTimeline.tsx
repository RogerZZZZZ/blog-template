import { IComponentProps } from '@interface/index'
import { IExperience } from '@interface/profile'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Icon, Timeline } from 'antd'

interface IExperienceTimelingProps extends IComponentProps {
  data: IExperience[]
}

const EducationTimeline = ({ classes, data }: IExperienceTimelingProps) => {

  const renderTimelineItem = (items: IExperience[]) => (
    items.map((item: IExperience) => (
      <Timeline.Item 
        dot={<Icon type="clock-circle-o" />}>
          <h2>{item.company}</h2>
          <h3>{item.startTime} ~ {item.endTime}</h3>
          <h3>{item.title}</h3>
      </Timeline.Item>
    ))
  )

  return (
    <div className={classes.container}>
      <Timeline mode="alternate">
        {renderTimelineItem(data)}
      </Timeline>
    </div>
  )
}

export default injectSheet({
  container: {
    margin: '30px 50px',
  }
})(EducationTimeline)