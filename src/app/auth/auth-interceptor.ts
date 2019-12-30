import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(userData => {
                if (!userData) {
                    return next.handle(req);
                }
                else {
                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', userData.token)
                    })
                    return next.handle(modifiedRequest);

                }
            }))
    }
}