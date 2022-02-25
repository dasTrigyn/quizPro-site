import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private _router: Router,
    ){}

  canActivate(): boolean {
    if(this.authService.loggedIn()){

      const token = localStorage.getItem('token');
      console.log("AuthGuard 1")
      console.log(token)
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        console.log(tokenDecode)
        if(!tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
          return true;
        }
      }
      //this._router.navigate(['/admin-panel'])
      return false;
    }
    else{
      this._router.navigate(['/register'])
      return false
    }
  }
  private _tokenExpired(exp: any) {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
    private _router: Router,
    ){}

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      const token = localStorage.getItem('token');
      console.log(token)
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        console.log(tokenDecode)
        console.log("AdminGuard 1")
        if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
          console.log("AdminGuard true")
          return true;
        }
      }
      return true;
    }
    else{
      this._router.navigate(['/register'])
      return false
    }
  }

  private _tokenExpired(exp: any) {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
  
}