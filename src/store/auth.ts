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
      try {
        const response = await UserService.login({
          email,
          password
        })
        this.token = response
        return response
      } catch (e: any) {
        console.error(e.response)
        return e.response
      }
    }
    // login
    // set token
    // set localstorage
  }
})
