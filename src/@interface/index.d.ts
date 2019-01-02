import { RouteComponentProps } from 'react-router-dom'

export interface IBasicProps {
  classes?: any
}

export interface IRouterProps extends RouteComponentProps<{}>, IBasicProps {

}

export interface IPostCardProps{
  abstract: string
  title: string
  tid: number
  createTime: number
  pinned: boolean
  classes?: any
}

export interface IToken {
  token: string
}

export interface ITag {
  name: string
  hex: string
  tagId: string
}