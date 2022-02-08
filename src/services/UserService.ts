import { LoginRequestType, UserInfoType } from '@/types'
import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app/api'

interface VerifiedAuthCodeRequest {
  email: string
  authCode: string
  issueToken: string
}
interface ChangePasswordRequest {
  email: string
  confirmToken: string
  newPassword: string
  newPasswordConfirm: string
}

export default class UserService {
  public static async login(requestData: LoginRequestType): Promise<string> {
    const response = await axios.post(`${BASE_URL}/login`, requestData, {
      headers: { 'Content-Type': 'application/json' }
    })

    return response.data.accessToken
  }
  public static async getUserInfo(token: string): Promise<UserInfoType> {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }
  public static async logout(token: string): Promise<AxiosResponse> {
    const response = await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  }
  public static async issueAuthCode(email: string): Promise<AxiosResponse> {
    const response = await axios.get(
      `${BASE_URL}/reset-password?email=${email}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response
  }
  public static async confirmAuthCode({
    email,
    authCode,
    issueToken
  }: VerifiedAuthCodeRequest): Promise<AxiosResponse> {
    const response = await axios.post(
      `${BASE_URL}/reset-password`,
      {
        email,
        authCode,
        issueToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response
  }
  public static async changePassword({
    email,
    confirmToken,
    newPassword,
    newPasswordConfirm
  }: ChangePasswordRequest): Promise<AxiosResponse> {
    const response = await axios.patch(
      `${BASE_URL}/reset-password`,
      {
        email,
        confirmToken,
        newPassword,
        newPasswordConfirm
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response
  }
}
