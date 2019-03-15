import { ICategory, IPostCard, IRouterProps } from '@interface/index'
import service from '@services'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

const Category = ({ classes, location }: IRouterProps) => {
  const [category, setCategory] = useState({} as ICategory)

  const fetchCategory = async () => {
    const query: string = location.search
    if (query) {
      const id = query.split('=')[1]
      const value: ICategory = await service.category.fetchById<ICategory>(id)
      console.log(value, 'value')
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <div>1</div>
  )
}

export default injectSheet({

})(Category)