import './App.css'

import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Admin from './pages/admin'
import Blog from './pages/blog'
import Create from './pages/create'
import Home from './pages/home'
import Login from './pages/login'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/new" component={Create} />
        <Route path="/admin" component={Admin}/>
      </Switch>
    </BrowserRouter>
  )
}
