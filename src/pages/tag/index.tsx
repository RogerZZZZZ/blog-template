import { IPostCard, IRouterProps, ITag } from '@interface/index'
import service from '@services'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

const Tag = ({ classes, location }: IRouterProps) => {
  const [tag, setTag] = useState({} as ITag)

  const fetchTag = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      const value: ITag = await service.tag.fetchById<ITag>(id)
      console.log(value, 'value')
    }
  }

  useEffect(() => {
    fetchTag()
  }, [])

  return (
    <div>1</div>
  )
}

export default injectSheet({

})(Tag)