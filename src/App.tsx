import './App.css'

import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Admin from './pages/admin'
import Archive from './pages/archives'
import Blog from './pages/blog'
import Category from './pages/category'
import Create from './pages/create'
import Home from './pages/home'
import Login from './pages/login'
import Profile from './pages/profile'
import Tag from './pages/tag'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/new" component={Create} />
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/archive" component={Archive}/>
        <Route exact path="/tag" component={Tag}/>
        <Route exact path="/category" component={Category}/>
        <Route path="/admin" component={Admin}/>
      </Switch>
    </BrowserRouter>
  )
}
