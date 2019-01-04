import { RouteComponentProps } from 'react-router-dom'

export interface IBasicProps {
  classes?: any
}

export interface IRouterProps extends RouteComponentProps<{}>, IBasicProps {

}

export interface IPostCard extends IBasicProps {
  abstract: string
  title: string
  post?: string
  pinned: boolean
  postId: string
  updatedAt: number
}

export interface ITag {
  name: string
  hex: string
  tagId: string
}