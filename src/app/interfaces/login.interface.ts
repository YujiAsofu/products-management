export interface LoginPayload {
  username: string
  password: string
  expiresInMins: number
}

export interface LoginResponse {
  token: string
}
