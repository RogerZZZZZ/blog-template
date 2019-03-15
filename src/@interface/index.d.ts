import { RouteComponentProps } from 'react-router-dom'

export interface IBasicProps {
  classes?: any
}

export interface IComponentProps extends IBasicProps {
  children?: any
}

export interface IRouterProps extends RouteComponentProps<{}>, IBasicProps {
}

export interface IPostCard extends IBasicProps {
  abstract: string
  title: string
  post?: string
  tags?: string[]
  categoryId: string
  pinned: boolean
  _id: string
  updatedAt: number
  createdAt: number
}

export interface IHeader extends IBasicProps {
}

export interface ITag {
  name: string
  hex: string
  _id: string
}

export interface ITagFull extends ITag {
  articles: string[]
}

export interface ICommonTag {
  name: string
  articles: any[]
  hex?: string
  _id: string
}

export interface ICategory {
  name: string
  _id: string
  articles: string[]
}