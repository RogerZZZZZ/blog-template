import { IComponentProps } from '@interface'
import * as React from 'react'
import injectSheet from 'react-jss'

interface IFlexProps extends IComponentProps {
  direction?: string
}


const Flex = ({ children, direction, classes }: IFlexProps) => {
  const className: any = direction === 'row' ? classes.container: classes.containerColumn

  return (
    <div className={className}>
      {children}
    </div>
  )
}

Flex.defaultProps = {
  direction: 'row',
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