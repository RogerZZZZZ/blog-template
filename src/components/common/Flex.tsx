import { IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet from 'react-jss'

interface IFlexProps extends IComponentProps {
  direction?: string
  width?: number
}

const Flex = ({ children, direction, classes, width }: IFlexProps) => {
  const style: any = {
    flexDirection: direction === 'column' ? direction : 'row',
    width: width || 'auto',
  }

  return (
    <div className={classes.container} style={style}>
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