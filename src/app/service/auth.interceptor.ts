import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';
import { AuthHttpService } from './auth-http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwt: JwtService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    const token = this.jwt.getTokenFromLocalStorage();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next
        .handle(request)
        .pipe(catchError((error) => this.handleError(error)));
    }

    return next.handle(request);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      //  unauthorized
      return throwError(error);
    }

    if (error.status === 403) {
      //  forbidden
      return throwError(error);
    }

    if (error.status === 400) {
      //  bad request
      return throwError(error);
    }

    return throwError(error);
  }
}
