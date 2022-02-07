import { LoginRequestType } from '@/types'
import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app/api'

export default class UserService {
  public static async login(
    requestData: LoginRequestType
  ): Promise<AxiosResponse> {
    let response
    try {
      response = await axios.post(`${BASE_URL}/login`, requestData, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('response : ', response)
      return response
    } catch (error: any) {
      console.error(error?.response)
      return error.response
    }
  }
}
