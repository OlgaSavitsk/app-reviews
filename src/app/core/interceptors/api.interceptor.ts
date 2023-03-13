import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, throwError, finalize } from 'rxjs';
import { Path } from 'src/app/app.constants';

import { environment } from 'src/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const spinner = inject(NgxSpinnerService);
  const router = inject(Router);
  if (!request.url.includes('assets/i18n/')) {
    spinner.show()
    return next(
      request.clone({
        url: `${environment.BASE_URL}/${request.url}`,
      })
    ).pipe(
      finalize(() => spinner.hide()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized || error.status === 403) {
          //router.navigate([Path.mainPage])
        }
        return throwError(error);
      })
    );
  }
  return next(
    request.clone({
      url: `${request.url}/`,
    })
  );
};
