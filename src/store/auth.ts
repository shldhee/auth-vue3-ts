import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { LoginRequestType, UserInfoType } from '@/types'
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
    async login({ email, password }: LoginRequestType): Promise<string> {
      try {
        const response = await UserService.login({
          email,
          password
        })
        this.token = response
        TokenService.set(this.token)
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    },
    async fetchUserInfo(): Promise<string> {
      try {
        const repsonse = await UserService.getUserInfo(this.token!)
        const { name, email, profileImage, lastConnectedAt } = repsonse
        this.userInfo = { name, email, profileImage, lastConnectedAt }
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    },
    async logout(): Promise<string> {
      try {
        await UserService.logout(this.token!)
        this.token = null
        this.userInfo = {
          name: '',
          email: '',
          profileImage: '',
          lastConnectedAt: null
        }
        TokenService.remove()
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    },
    async requestAuthCode(email: string): Promise<string> {
      try {
        const response = await UserService.issueAuthCode(email)
        this.resetEmail = email
        this.remainTime = response.remainMillisecond
        this.issueToken = response.issueToken
        this.token = null
        TokenService.remove()
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        this.confirmToken = response.confirmToken
        this.remainTime = 0
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        this.resetEmail = ''
        this.issueToken = ''
        this.confirmToken = ''
        return 'success'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response)
        return e.response.data.error.message
      }
    }
  }
})
