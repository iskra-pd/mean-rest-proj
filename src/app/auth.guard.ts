import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
* Authorization guard
*/
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

/**
* Guards routes if authorization has not been established
*/
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['signin']);
    return false;
  }
}
