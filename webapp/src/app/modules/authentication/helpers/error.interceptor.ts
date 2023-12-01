import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          // this.router.navigate(['/auth/not-authorized']);

          // ? Can also logout and reload if needed
          this.authenticationService.logout();
        }
        // throwError
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
