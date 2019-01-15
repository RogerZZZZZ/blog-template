import { IBasicProps } from '@interface'
import * as hljs from 'highlight.js'
import * as MarkDown from 'markdown-it'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import injectSheet from 'react-jss'
import { fromEvent } from 'rxjs'
import { useEventCallback } from 'rxjs-hooks'
import { debounceTime, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators'

import 'highlight.js/styles/github.css'
import './index.css'

import { 
  Input,
  Layout,
} from 'antd'

const { TextArea } = Input
const { Content } = Layout

interface IProps extends IBasicProps {
  exposeFn: (v: string) => void
  value?: string
}

const md = new MarkDown({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {console.log(__)}
    }
    return ''; // use external default escaping
  }
})

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

const MarkDownEditor = ({ classes, exposeFn, value }: IProps) => {
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
          const v = event.target.value
          exposeFn(v)
          return md.render(v)
        }),
        debounceTime(1000)
      ),
      md.render('')
  )

  const leftStyle = {
    flexBasis: leftX === null ? 0 : (leftX > maxOffset ? maxOffset : leftX ),
    flexGrow: leftX === null ? 1 : 0,
    flexShrink: 0,
  }

  return (
    <Content className={classes.container}>
      <div className={classes.content} ref={editorEle} style={leftStyle}>
        <TextArea autosize={false} onChange={editingPost} value={value}/>
      </div>
      
      <div className={classes.resizer} onMouseDown={onMouseDown}/>

      <div className={classes.content}>
        <div className={classes.renderPart}>
          <div dangerouslySetInnerHTML={{__html: renderMarked}}/>
        </div>
      </div>
    </Content>
  )
}

export default injectSheet({
  container: {
    display: 'flex',
    height: '500px',
    minHeight: '500px',
    margin: '0 auto',
    width: '100%',
  },
  content: {
    flex: '1 1 0',
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
    overflow: 'auto',
    border: '1px solid #d9d9d9'
  }
})(MarkDownEditor)