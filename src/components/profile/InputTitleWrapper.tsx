import { IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet from 'react-jss'

interface ITitleProps extends IComponentProps {
  title: string
}

const InputTitleWrapper = ({ children, title, classes }: ITitleProps) => {

  return (
    <div className={classes.container}>
      <span className={classes.title}>{title}</span>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px',
  },
  content: {
    margin: '0 0 0 20px',
  },
  title: {
    width: '100px',
    display: 'flex',
    alignItems: 'center',
  },
})(InputTitleWrapper)