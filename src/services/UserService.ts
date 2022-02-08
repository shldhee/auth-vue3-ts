import { LoginRequestType } from '@/types'
import axios from 'axios'

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app/api'

export default class UserService {
  public static async login(requestData: LoginRequestType): Promise<string> {
    const response = await axios.post(`${BASE_URL}/login`, requestData, {
      headers: { 'Content-Type': 'application/json' }
    })

    return response.data.accessToken
  }
}
