import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { IssueAuthCode, LoginRequestType, UserInfoType } from '@/types'
import TokenService from '@/services/TokenService'
import { AxiosResponse } from 'axios'

export type AuthState = {
  token: string | null
  userInfo: UserInfoType
  remainTime: number
  issueToken: string
  loading: boolean
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    return {
      token: TokenService.get(),
      // token: null,
      userInfo: {
        name: '',
        email: '',
        profileImage: '',
        lastConnectedAt: null
      },
      remainTime: 0,
      issueToken: '',
      loading: false
    }
  },
  actions: {
    async login({ email, password }: LoginRequestType) {
      try {
        const response = await UserService.login({
          email,
          password
        })
        this.token = response
        TokenService.set(this.token)
        return response
      } catch (e: any) {
        console.error(e.response)
        return e.response
      }
    },
    // login
    // set token
    // set localstorage
    async fetchUserInfo() {
      try {
        const repsonse = await UserService.getUserInfo(this.token!)
        const { name, email, profileImage, lastConnectedAt } = repsonse
        this.userInfo = { name, email, profileImage, lastConnectedAt }
        return true
      } catch (e: any) {
        console.error(e.response)
        return e.response
      }
    },
    async logout(): Promise<AxiosResponse | boolean> {
      try {
        const response = await UserService.logout(this.token!)
        this.token = null
        TokenService.remove()
        console.log('logout response', response)
        return true
      } catch (e: any) {
        console.error(e.response)
        return e.response
      }
    },
    async requestAuthCode(email: string): Promise<IssueAuthCode | string> {
      try {
        const response = await UserService.issueAuthCode(email)
        console.log(response)
        this.remainTime = response.data.remainMillisecond
        this.issueToken = response.data.issueToken
        return response.data
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    }
  }
})
