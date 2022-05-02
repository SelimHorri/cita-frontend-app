
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    if (this.authenticationService.isLoggedIn())
      console.log(`You are authenticated, singout to access login page`);
    
    return !this.authenticationService.isLoggedIn();
  }
  
  
  
}
