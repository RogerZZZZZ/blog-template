import { IComponentProps } from '@interface'
import * as React from 'react'
import injectSheet from 'react-jss'

interface ITitleProps extends IComponentProps {
  title: string
}

const InputTitleWrapper = ({ children, title, classes }: ITitleProps) => {

  return (
    <div className={classes.container}>
      <h3>{title}</h3>
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
  }
})(InputTitleWrapper)