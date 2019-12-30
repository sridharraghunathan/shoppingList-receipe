import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: number,
  localId?: string,
  registered?: boolean,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private route: Router) { }
  user = new BehaviorSubject<User>(null);

  logout() {
    this.user.next(null);
    this.route.navigate(['/authenticate']);
    localStorage.removeItem('userInfo')

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)

    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => { this.logout() }
      , expirationDuration)
  }

  autoLogin() {
    const userStorage: User = JSON.parse(localStorage.getItem('userInfo'))
    if (!userStorage) {
      return;
    }
    const loadedinfo = new User(
      userStorage.email,
      userStorage.id,
      userStorage._token,
      userStorage._tokenExpirationDate
    )
    if (loadedinfo.token) { this.user.next(loadedinfo); }
    const expirationTime = new Date(userStorage._tokenExpirationDate).getTime() - new Date().getTime();
    console.log("expirationTime" + expirationTime)
    this.autoLogout(expirationTime);
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorMsg => this.handleError(errorMsg)),
      tap(resData => this.userDataHandle(resData))
    )
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorMsg => this.handleError(errorMsg)),
      tap(resData => this.userDataHandle(resData))
    )
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = "An Error Occured,"
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errorMessage);
    }
    else {
      errorMessage = errResponse.error.error.message;
      return throwError(errorMessage);
    }
  }

  private userDataHandle(resData: AuthResponse) {
    const exp: number = +resData.expiresIn * 1000
    const expirationDate = new Date(
      new Date().getTime() + exp)
    const userData = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.user.next(userData)
    localStorage.setItem('userInfo', JSON.stringify(userData));
    console.log(resData.expiresIn);
    //this.autoLogout(resData.expiresIn);

  }
}