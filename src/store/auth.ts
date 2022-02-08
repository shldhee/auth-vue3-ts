import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { LoginRequestType, UserInfoType } from '@/types'
import TokenService from '@/services/TokenService'

export type AuthState = {
  token: string | null
  userInfo: UserInfoType
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    return {
      token: TokenService.get(),
      userInfo: {
        name: '',
        email: '',
        profileImage: '',
        lastConnectedAt: ''
      }
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
        console.log('this.token : ', this.token)
        const repsonse = await UserService.getUserInfo(this.token!)
        const { name, email, profileImage, lastConnectedAt } = repsonse
        this.userInfo = { name, email, profileImage, lastConnectedAt }
        console.log('response', repsonse)
        return true
      } catch (e: any) {
        console.error(e.response)
        return e.response
      }
    }
  }
})
