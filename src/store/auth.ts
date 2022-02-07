import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { LoginRequestType } from '@/types'

export type AuthState = {
  token: string | null
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    return { token: null }
  },
  actions: {
    async login({ email, password }: LoginRequestType) {
      const response = await UserService.login({
        email,
        password
      })

      if (response.status === 200) {
        this.token = response.data.accessToken
        return {
          status: response.status,
          message: 'success'
        }
      }

      return {
        status: response.status,
        message: response.data.error.message
      }
    }
    // login
    // set token
    // set localstorage
  }
})
