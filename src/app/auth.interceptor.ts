import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${authToken}`
      }
    });
  }
  return next(req);
};
export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: authInterceptor,
  multi: true
};
