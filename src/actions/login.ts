export type LoginAction = 
  | {
    type: 'login';
    username: string;
    password: string;
  }
  | {
    type: 'logout';
  }