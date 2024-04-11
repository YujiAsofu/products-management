import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    const loginEndpoint = 'https://dummyjson.com/auth/login'
    const loginData = {
      username: username,
      password: password,
      expiresInMins: 60,
    }
    return this._http.post<any>(loginEndpoint, loginData).pipe(
      map(res => {
        localStorage.setItem('token', res.token)
      })
    )
  }
}
