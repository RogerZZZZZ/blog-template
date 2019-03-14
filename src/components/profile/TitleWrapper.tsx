import { IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet from 'react-jss'

interface ITitleProps extends IComponentProps {
  title: string
}

const TitleWrapper = ({ children, title, classes }: ITitleProps) => {

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    margin: '10px 0',
  },
  title: {
    position: 'relative',
    display: 'inline-block',
    fontWeight: 300,
    margin: '0 0 30px 0',
    '&:after': {
      position: 'absolute',
      content: '""',
      top: '100%',
      height: '2px',
      width: '50px',
      left: '0',
      right: '0',
      margin: '0 auto',
      background: '#3498db',
    },
  },
  content: {
    margin: '0 20px',
  }
})(TitleWrapper)