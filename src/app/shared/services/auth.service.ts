import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';
import { BaseService } from './base.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private tokenSubject!: BehaviorSubject<Token>;

  constructor(
    http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    super(http);
    this.tokenSubject = new BehaviorSubject<any>(null);
  }

  login(user: User) {
    return this.post<Token>(`${this.baseURL}/auth`, user).pipe(
      map((res) => {
        this.tokenService.saveToken(res);

        this.tokenSubject.next(res);
        return res;
      })
    );
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['']);
  }

  refresh(refreshToken: string) {
    return this.post<Token>(`${this.baseURL}/auth/refresh`, {
      refreshToken: refreshToken,
    }).pipe(
      map((res) => {
        this.tokenService.saveToken(res);

        this.tokenSubject.next(res);
        return res;
      })
    );
  }
}
