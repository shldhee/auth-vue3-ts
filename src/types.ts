export interface LoginRequestType {
  email: string
  password: string
}
export interface UserInfoType {
  name: string
  email: string
  profileImage: string
  lastConnectedAt: Date | null
}

export interface IssueAuthCode {
  issueToken: string
  remainMillisecond: number
}
