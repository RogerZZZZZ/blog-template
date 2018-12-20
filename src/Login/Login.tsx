import * as React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'
import IProps from '../@interface/InjectStyle'
import service from '../service'

import { 
  Layout,
  Input, Card,
  Button,
} from 'antd'

const { Header, Content} = Layout

const LoginBox = ({classes}: IProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loging, setLoging] = useState(false)

  const loginAction = async (event: any) => {
    console.log(username, password);
    setLoging(true)
    try {
      const data = await service.auth.login({
        username,
        password,
      })
      console.log(data)
      setLoging(false)
    } catch(err) {
      setLoging(false)
    }
  }

  return (
    <Layout className={classes.fullHeight}>
      <Header>Header</Header>
      <Content>
        <Card className={classes.card}>
          <Input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className={classes.inputItem}/>
          <Input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className={classes.inputItem} type="password"/>
          <Button type="primary" onClick={loginAction} loading={loging}>Login</Button>
        </Card>
      </Content>
    </Layout>
  )
}

const Login = injectSheet({
  card: {
    width: '500px',
    height: '300px',
    position: 'relative',
    top: '50%',
    left: '50%',
    marginTop: '200px',
    marginLeft: '-250px'
  },
  fullHeight: {
    height: '100vh'
  },
  inputItem: {
    marginBottom: '30px'
  }
})(LoginBox)

export default Login