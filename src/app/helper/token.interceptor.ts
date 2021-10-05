import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../service/token-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.getUser().token;
    if (token != null) {
      authRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)})
    }
    return next.handle(authRequest);
  }
}

export const tokenInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
}]
