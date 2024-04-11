import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const loginGuard: CanActivateFn = (route, state) => {
  if (window.localStorage.getItem('token')) {
    return true
  }
  const router = inject(Router)
  router.navigate(['/login'])
  return false
}
