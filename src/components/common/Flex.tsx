import { IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet, { CSSProperties } from 'react-jss'

interface IFlexProps extends IComponentProps {
  direction?: string
  style?: CSSProperties
}

const Flex = ({ children, direction, classes, style }: IFlexProps) => {
  const className: any = direction === 'column' ? classes.containerColumn: classes.container

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default injectSheet({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
  }
})(Flex)