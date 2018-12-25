import * as React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'
import IProps from '../../@interface/InjectStyle'
import { RootState } from '../../reducers'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { 
  Layout,
  Input, Card,
  Button,
  Alert,
} from 'antd'

const { Header, Content} = Layout

const logState = (state: RootState) => ({
  logging: state.auth.logging,
  token: state.auth.token,
  message: state.auth.message,
})

const LoginBox = ({ classes }: IProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { logging, token, message } = useMappedState(logState)

  const loginAction = async (event: any) => {
    const payload = {
      username,
      password,
    }
    dispatch({type: 'LOGIN', payload})
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