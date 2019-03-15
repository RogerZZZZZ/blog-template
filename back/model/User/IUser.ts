export interface IProject {
  time?: string,
  name?: string,
  link?: string,
  skill?: string,
  intro?: string,
}

export interface IEducation {
  startTime?: string,
  endTime?: string,
  school?: string,
  major?: string,
  degree?: string,
}

export interface IExperience {
  startTime?: string,
  endTime?: string,
  company?: string,
  title?: string,
}

export interface IBasicInfo {
  username?: string,
  github?: string,
  email?: string,
  instruction?: string,
}

export interface IUser {
  createdAt?: Date,
  userName: string,
  password: string,
  name: string,
  github?: string,
  email?: string,
  linkedIn?: string,
  education: IEducation[],
  projects: IProject[],
  experience: IExperience[],
  instruction?: string,
}