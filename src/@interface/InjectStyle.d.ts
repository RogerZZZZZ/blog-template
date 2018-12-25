import { RouteComponentProps } from 'react-router-dom'

interface IProps extends RouteComponentProps<{}> {
  classes?: any;
}

export interface IPostCardProps {
  abstract: string;
  title: string;
  tid: number;
  createTime: number;
  pinned: boolean;
}

export default IProps