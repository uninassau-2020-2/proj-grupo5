import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn()) {
      return true;
      }
      // navigate to login page as user is not authenticated
      this.router.navigate(['/login']);
      return false;
}
public isLoggedIn(): boolean {
   let status = false;
   if (sessionStorage.getItem('isLoggedIn') === 'true') {
      status = true;
   } else {
      status = false;
      }
   return status;
   }


}
