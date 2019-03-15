import './App.css'

import * as React from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/login" component={lazy(() => import('./pages/login'))}/>
          <Route exact path="/blog" component={lazy(() => import('./pages/blog'))} />
          <Route exact path="/new" component={lazy(() => import('./pages/create'))} />
          <Route exact path="/profile" component={lazy(() => import('./pages/profile'))}/>
          <Route exact path="/archive" component={lazy(() => import('./pages/archives'))}/>
          <Route exact path="/tag" component={lazy(() => import('./pages/tag'))}/>
          <Route exact path="/category" component={lazy(() => import('./pages/category'))}/>
          <Route exact path="/admin" component={lazy(() => import('./pages/admin'))}/>
          <Route path="/" component={lazy(() => import('./pages/home'))} />
      </Suspense>
    </BrowserRouter>
  )
}
