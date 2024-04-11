import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { loginGuard } from './login.guard'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [loginGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
]
