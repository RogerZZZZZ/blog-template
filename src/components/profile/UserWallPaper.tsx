import { IComponentProps } from '@interface/index'
import { IBasicInfo } from '@interface/profile'
import * as React from 'react'
import injectSheet from 'react-jss'

import { Icon } from 'antd'

interface IWallPaperProp extends IComponentProps {
  data: IBasicInfo
}

const UserWallPaper = ({ classes, data }: IWallPaperProp) => {
  const renderTip = (icon: string, name?: string) => (
    !!name 
    ? <>
        <Icon type={icon}/>
        <span className={classes.subItem}>{name}</span>
      </>
    : <div />
  )
  
  const direct = (url: string) => window.open(url)

  const renderLink = (icon: string, url?: string) => (
    !!url
    ? <div>
        <Icon type={icon} onClick={() => direct(url)} className={classes.icon}/>
      </div>
    : <div />
  )

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>{data.name}</h1>
        <h2 className={classes.subTitle}>{data.introduction}</h2>
        {renderTip('mail', data.email)}
        {renderLink('github', data.github)}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    width: '100%',
    backgroundColor: '#c8c8c8',
    height: '100vh',
    maxHeight: '1080px',
    minHeight: '500px',
  },
  content: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  title: {
    color: '#555',
    fontWeight: 900,
    fontSize: '5em',
    letterSpacing: '0.05em',
    lineHeight: '0.9em',
  },
  subTitle: {
    color: '#888',
    fontWeight: 500,
    fontSize: '2.25em',
    marginBottom: '15px',
  },
  subItem: {
    marginLeft: '10px',
  },
  icon: {
    cursor: 'pointer',
  }
})(UserWallPaper)