import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { RouterLink } from '@angular/router'
import { AuthService } from '../services/auth.services'
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authForm: FormGroup

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.authForm = this._fb.group({
      username: '',
      password: '',
    })
  }

  onFormSubmit() {
    if (this.authForm.valid) {
      this._authService
        .login(this.authForm.value.username, this.authForm.value.password)
        .subscribe(() => this._router.navigate(['/dashboard']))
    }
  }
}
