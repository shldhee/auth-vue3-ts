import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { IssueAuthCode, LoginRequestType, UserInfoType } from '@/types'
import TokenService from '@/services/TokenService'
import { AxiosResponse } from 'axios'

interface AuthState {
  token: string | null
  userInfo: UserInfoType
  resetEmail: string
  remainTime: number
  issueToken: string
  confirmToken: string
  loading: boolean
}

interface NewPassword {
  newPassword: string
  newPasswordConfirm: string
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
      resetEmail: '',
      remainTime: 0,
      issueToken: '',
      confirmToken: '',
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
        this.userInfo = {
          name: '',
          email: '',
          profileImage: '',
          lastConnectedAt: null
        }
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
        this.resetEmail = email
        this.remainTime = response.data.remainMillisecond
        this.issueToken = response.data.issueToken
        this.token = null
        TokenService.remove()
        return response.data
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    },
    async verifyAuthCode(authCode: string): Promise<string> {
      try {
        const response = await UserService.confirmAuthCode({
          email: this.resetEmail,
          authCode,
          issueToken: this.issueToken
        })
        this.confirmToken = response.data.confirmToken
        this.remainTime = 0
        return 'success'
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    },
    async requestChangePassword({
      newPassword,
      newPasswordConfirm
    }: NewPassword): Promise<string> {
      try {
        await UserService.changePassword({
          email: this.resetEmail,
          confirmToken: this.confirmToken,
          newPassword,
          newPasswordConfirm
        })

        return 'success'
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      } finally {
        this.resetEmail = ''
        this.issueToken = ''
        this.confirmToken = ''
      }
    }
  }
})
