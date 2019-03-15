import { IComponentProps } from '@interface/index'
import { IEducation } from '@interface/profile'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Icon, Timeline } from 'antd'

interface IEducationTimelineProps extends IComponentProps {
  data: IEducation[]
}

const EducationTimeline = ({ classes, data }: IEducationTimelineProps) => {

  const renderTimelineItem = (items: IEducation[]) => (
    items.map((item: IEducation) => (
      <Timeline.Item 
        dot={<Icon type="clock-circle-o" />}>
          <h2>{item.school}</h2>
          <h3>{item.startTime} ~ {item.endTime}</h3>
          <h3>{item.major}</h3>
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
    padding: '30px 0',
  }
})(EducationTimeline)