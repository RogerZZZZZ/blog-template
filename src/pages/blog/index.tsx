import * as React from 'react'
import { useRef, useState, useEffect, Fragment } from 'react'
import { useEventCallback } from 'rxjs-hooks'
import { fromEvent } from 'rxjs'
import { map, switchMap, takeUntil, withLatestFrom, debounceTime } from 'rxjs/operators'
import injectSheet from 'react-jss'
import IProps from '../../@interface/InjectStyle'
import * as marked from 'marked'

import { 
  Layout,
  Input,
} from 'antd'

const { TextArea } = Input
const { Header, Content} = Layout

const useMaxOffsetWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])
  return width - 600
}

const Blog = ({ classes }: IProps) => {
  const editorEle = useRef(null)
  const maxOffset = useMaxOffsetWidth()
  const [onMouseDown, leftX] = useEventCallback(
    (event$: any, inputs$: any) =>
      event$.pipe(
        withLatestFrom(inputs$.pipe(map(([editorEle]) => editorEle))),
        switchMap(([event, editorEle]) => {
          const leftStyle = getComputedStyle(editorEle.current);
          const width0 = parseFloat(leftStyle.getPropertyValue("width"));
          const startX = event.clientX;
          return fromEvent(window, "mousemove").pipe(
            map((moveEvent: any) => moveEvent.clientX - startX + width0),
            takeUntil(fromEvent(window, "mouseup"))
          );
        })
      ),
    null,
    [editorEle]
  )

  const [editingPost, renderMarked] = useEventCallback(
    (event$: any, input$: any) =>
      event$.pipe(
        withLatestFrom(input$),
        map(([event]) => {
          return marked(event.target.value)
        }),
        debounceTime(1000)
      ),
      marked('')
  )

  const leftStyle = {
    flexBasis: leftX === null ? 0 : (leftX > maxOffset ? maxOffset : leftX ),
    flexGrow: leftX === null ? 1 : 0,
    flexShrink: 0,
  }

  return (
    <Layout className={classes.blogBody}>
      <Header>Header</Header>

      <Content className={classes.container}>
        <div className={classes.content} ref={editorEle} style={leftStyle}>
          <TextArea autosize={false} onChange={editingPost}/>
        </div>
        
        <div className={classes.resizer} onMouseDown={onMouseDown}/>

        <div className={classes.content}>
          <div className={classes.renderPart}>
            <p dangerouslySetInnerHTML={{__html: renderMarked}}/>
          </div>
        </div>
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
  content: {
    flex: '1 1 0',
    padding: '0 20px',
    minWidth: '500px',
    height: '100%',
    display: 'flex'
  },
  resizer: {
    position: 'relative',
    display: 'flex',
    flex: '0 0',
    padding: '2px',
    background: 'orange',
    cursor: 'col-resize',
    userSelect: 'none',
  },
  renderPart: {
    padding: '4px 11px',
    backgroundColor: 'white',
    width: '100%',
    overflow: 'auto'
  }
})(Blog)