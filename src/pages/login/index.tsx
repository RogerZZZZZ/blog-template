import { LogCons } from '@constants'
import { IRouterProps } from '@interface'
import { logState } from '@reducers/state'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { 
  Alert,
  Button,
  Card,
  Input,
  Layout,
} from 'antd'

const { Header, Content} = Layout

const LoginBox = ({ classes }: IRouterProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch() 
  const { logging, message } = useMappedState(logState)

  const loginAction = () => {
    const payload = {
      username,
      password,
    }
    dispatch({type: LogCons.LOGIN, payload})
  }

  const showAlert = (msg: string | undefined) => {
    return msg
      ? <Alert type='error'
              message={message}
              showIcon
              className={classes.alert}/>
      : null
  }

  return (
    <Layout className={classes.fullHeight}>
      <Header>Header</Header>
      <Content>
        <Card className={classes.card}>
          <Input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className={classes.inputItem}/>
          <Input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className={classes.inputItem} type="password"/>
          {showAlert(message)}
          <Button type="primary" onClick={loginAction} loading={logging}>Login</Button>
        </Card>
      </Content>
    </Layout>
  )
}

const Login = injectSheet({
  card: {
    width: '500px',
    position: 'relative',
    top: '50%',
    left: '50%',
    marginTop: '200px',
    marginLeft: '-250px',
  },
  fullHeight: {
    height: '100vh',
  },
  inputItem: {
    marginBottom: '30px',
  },
  alert: {
    marginBottom: '20px',
  },
})(LoginBox)

export default Login