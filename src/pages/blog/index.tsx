import * as React from 'react'
import IProps from 'src/@interface/InjectStyle';
import injectSheet from 'react-jss';
import MarkDownEditor from '../../components/markdown'
import ColorPicker from '../../components/colorpicker'

import { 
  Layout,
} from 'antd'

const { Header, Content} = Layout

const tags = [{
  name: 'V8',
  hex: '#eeeeee'
}, {
  name: 'Javascript',
  hex: '#BA68C8',
}]

const Blog = ({ classes }: IProps) => {

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <div>
          <ColorPicker tags={tags} editable/>
        </div>
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
  },
})(Blog)