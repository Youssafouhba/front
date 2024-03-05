import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from "../../../environments/environment";
import {User} from "../../models/user/user.model";
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // il faut difinire ces methodes dans le controller de backend
  login(data: User): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/authenticate`, data).pipe(
      tap((data: any) => User),
      catchError(err => throwError(() => err))
    )
  }

  register(data: User): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/register`, data).pipe(
      tap((data: any) => User),
      catchError(err => throwError(() => err))
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}
