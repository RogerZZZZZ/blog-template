import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Login from './pages/login'
import Home from './pages/home'
import Blog from './pages/blog'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
      </Switch>
    </BrowserRouter>
  )
}
