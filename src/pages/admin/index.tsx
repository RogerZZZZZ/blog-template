import { IRouterProps } from '@interface'
import { tokenState } from '@reducers/state'
import service from '@services'
import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { Link, Route, Switch } from 'react-router-dom'
import { useMappedState } from 'redux-react-hook'

import ArticleList from './ArticleList'
import CategoryList from './CategoryList'
import TagList from './TagList'

const { Header, Content, Sider } = Layout

const AdminPage = ({ classes }: IRouterProps) => {
  const pathName = window.location.pathname.split('/')
  const [menuKey, setMenuKey] = useState(pathName[pathName.length - 1])

  const { token } = useMappedState(tokenState)

  useEffect(() => {
    healthCheck()
  }, [])

  const healthCheck = async () => {
    await service.send(service.health.admin, null, token || ''); 
  }

  return (
    <Layout className={classes.container}>
      <Header>Header</Header>

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
          </Menu>
        </Sider>

        <Layout className={classes.contentLayout}>
          <Content className={classes.content}>
            <Switch>
              <Route exact path="/admin" component={ArticleList} />
              <Route exact path="/admin/category" component={CategoryList} />
              <Route exact path="/admin/tags" component={TagList} />
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
    padding: '24px 24px',
  },
  content: {
    background: '#fff',
    padding: '24px',
    margin: 0,
    minHeight: '280px',
  },
})(AdminPage)