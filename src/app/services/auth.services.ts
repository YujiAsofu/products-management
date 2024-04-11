import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { first, map } from 'rxjs'
import { LoginPayload, LoginResponse } from '../interfaces/login.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    const loginEndpoint = 'https://dummyjson.com/auth/login'
    const loginData: LoginPayload = {
      username: username,
      password: password,
      expiresInMins: 60,
    }
    return this._http.post<LoginResponse>(loginEndpoint, loginData).pipe(
      first(),
      map(res => {
        localStorage.setItem('token', res.token)
      })
    )
  }
}
