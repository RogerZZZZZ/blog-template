import { RouteComponentProps } from 'react-router-dom'

export interface IProps {
  classes?: any
}

export interface IRouterProps extends RouteComponentProps<{}>, IProps {

}

export interface IPostCardProps{
  abstract: string;
  title: string;
  tid: number;
  createTime: number;
  pinned: boolean;
  classes?: any;
}