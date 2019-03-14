import { IHeader } from '@interface/index'
import { logState } from '@reducers/state'
import * as React from 'react'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

import {
  Button,
} from 'antd'

const ProfilePage = ({ classes }: IHeader) => {
  const { login } = useMappedState(logState)

  const backToHome = () => {
    window.location.href = '/'
  }

  const backToProfile = () => {
    window.location.href = '/profile'
  }

  const backToAdmin = () => {
    window.location.href = '/admin'
  }

  const renderAdminBtn = () => (
    login ?
    <div className={classes.buttonIcon}>
      <Button type="dashed" icon="setting" onClick={backToAdmin}>
        Admin
      </Button>
    </div>
    : <div />
  )

  return (
    <div className={classes.header}>
      <div className={classes.buttonIcon}>
        <Button type="dashed" icon="home" onClick={backToHome}>
          Home
        </Button>
      </div>
      <div className={classes.buttonIcon}>
        <Button type="dashed" icon="profile" onClick={backToProfile}>
          Profile
        </Button>
      </div>
      { renderAdminBtn() }
    </div>
  )
}

export default injectSheet({
  header: {
    width: '100%',
    margin: 0,
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonIcon: {
    margin: '0 10px',
  },
})(ProfilePage)
