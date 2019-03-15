import { IComponentProps } from '@interface/index'
import * as React from 'react'
import injectSheet from 'react-jss'

interface ITitleProps extends IComponentProps {
  title: string,
  bgColor?: string,
}

const ProfileItem = ({ bgColor, children, title, classes }: ITitleProps) => {

  return (
    <div className={classes.container} style={{ backgroundColor: bgColor || '#fff'}}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '20px',
  },
  title: {
    position: 'relative',
    display: 'inline-block',
    fontWeight: 300,
    fontSize: '2em',
    margin: '30px 0',
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
})(ProfileItem)