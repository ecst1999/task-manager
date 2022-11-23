import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.auth.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(!this.tokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  private tokenExpired(expiration: any): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
