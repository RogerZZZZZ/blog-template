import Header from '@components/header/index'
import { IRouterProps } from '@interface/index'
import service from '@services'
import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { Link, Route, Switch } from 'react-router-dom'

import ArticleList from './ArticleList'
import CategoryList from './CategoryList'
import Profile from './Profile'
import TagList from './TagList'

const { Content, Sider } = Layout

const AdminPage = ({ classes }: IRouterProps) => {
  const pathName = window.location.pathname.split('/')
  const [menuKey, setMenuKey] = useState(pathName[pathName.length - 1])

  useEffect(() => {
    healthCheck()
  }, [])

  const healthCheck = async () => {
    await service.health.admin(null)
  }

  return (
    <Layout className={classes.container}>
      <Header />
      <Layout>
        <Sider className={classes.sider}>
          <Menu
            className={classes.menu}
            selectedKeys={[menuKey]}
            onClick={(e) => setMenuKey(e.key)}
            mode="inline">
            <Menu.Item key="posts">
              <Icon type="file"/>
              <span>Posts List</span>
              <Link to="/admin"/>
            </Menu.Item>
            <Menu.Item key="category">
              <Icon type="project"/>
              <span>Category List</span>
              <Link to="/admin/category"/>
            </Menu.Item>
            <Menu.Item key="tags">
              <Icon type="tag"/>
              <span>Tag List</span>
              <Link to="/admin/tags"/>
            </Menu.Item>
            <Menu.Item key="profile">
              <Icon type="user"/>
              <span>User Profile</span>
              <Link to="/admin/profile"/>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className={classes.contentLayout}>
          <Content className={classes.content}>
            <Switch>
              <Route exact path="/admin" component={ArticleList} />
              <Route exact path="/admin/category" component={CategoryList} />
              <Route exact path="/admin/tags" component={TagList} />
              <Route exact path="/admin/profile" component={Profile} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default injectSheet({
  container: {
    height: '100%',
    minHeight: '100vh',
  },
  sider: {
    width: '300px',
    background: '#fff',
  },
  menu: {
    height: '100%',
    borderRight: 0,
  },
  contentLayout: {
    padding: '0 24px',
  },
  content: {
    background: '#fff',
    padding: '24px',
    margin: 0,
    minHeight: '280px',
  },
})(AdminPage)