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
  introduction?: string,
}