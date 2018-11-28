import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Login from './Login/Login'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}
