export interface IPost {
  categoryId?: string,
  abstract: string,
  post: string,
  pinned: boolean,
  title: string,
  tags: string[],
}