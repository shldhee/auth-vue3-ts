import axios from 'axios'

interface LoginRequestType {
  email: string
  password: string
}

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app/api'

export default class UserService {
  public static async login(requestData: LoginRequestType): Promise<string> {
    const response = await axios.post(`${BASE_URL}/login`, requestData)
    console.log(response)
    return response.data.accessToken
  }
}
