interface ITag {
  hax: string,
  name: string,
}

export interface IPost {
  categoryId?: string,
  abstract: string,
  content: string,
  title: string,
  tags: ITag[],
}