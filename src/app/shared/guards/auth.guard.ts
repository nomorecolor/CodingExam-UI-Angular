import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiresLogin = route.data['requiresLogin'] || false;

    const token = this.tokenService.getToken();

    if (requiresLogin) {
      if (token !== null) return true;

      this.router.navigate(['/']);
    } else {
      if (token === null) return true;

      this.router.navigate([`/home`]);
    }

    return false;
  }
}
