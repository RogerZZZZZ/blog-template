import { Layout } from 'antd';
import * as React from 'react';
import injectSheet from 'react-jss';

import ColorPicker from '@components/colorpicker';
import MarkDownEditor from '@components/markdown';
import { IProps } from '@interface';

const { Header, Content} = Layout

const tags = [{
  name: 'test-tags',
  hex: '#654321',
  tagId: '1'
}, {
  name: 'tesat-tags-2',
  hex: '#123456',
  tagId: '2'
}]

const Blog = ({ classes }: IProps) => {

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <Layout>
          <div className={classes.editArea}>
            <ColorPicker tags={tags} editable/>
          </div>
        </Layout> 
        <MarkDownEditor />
      </Content>
    </Layout>
  )
}

export default injectSheet({
  blogBody: {
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: '#e8e8e8',
  },
  container: {
    display: 'flex',
    padding: '0 50px',
    height: '100%',
    margin: '24px auto',
    width: '100%',
    flexDirection: 'column',
  },
  editArea: {
    backgroundColor: '#fff',
    margin: '24px'
  }
})(Blog)