import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as UserAction from 'src/app/redux/actions/user.actions';

export const apiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);
  if (!request.url.includes('assets/i18n/')) {   
    return next(
      request.clone({
        url: `${environment.BASE_URL}/${request.url}`,
      }),
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === HttpStatusCode.Unauthorized ||
          error.status === 403
        ) {
          //store.dispatch(UserAction.ClearData());
          console.log('interceptor')
        }
        return throwError(error);
      }),
    );
  } else {
    return next(
      request.clone({
        url: `${request.url}/`,
      }))
  }
};
