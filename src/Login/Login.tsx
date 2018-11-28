import * as React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'
import IProps from '../@interface/InjectStyle'

import { 
  Layout,
  Input, Card,
} from 'antd'

const { Header, Content} = Layout

const LoginBox = ({classes}: IProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Layout className={classes.fullHeight}>
      <Header>Header</Header>
      <Content>
        <Card className={classes.card}>
          <Input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className={classes.inputItem}/>
          <Input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className={classes.inputItem}/>
        </Card>
      </Content>
    </Layout>
  )
}

const Login = injectSheet({
  card: {
    width: '500px'
  },
  fullHeight: {
    height: '100vh'
  },
  inputItem: {
    marginBottom: '30px'
  }
})(LoginBox)

export default Login