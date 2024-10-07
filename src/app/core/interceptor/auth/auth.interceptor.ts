import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastrService);

  const token = authService.getToken();

  const checkTokenExpiration = (token: string): boolean => {
    if(!token) {
      return true;
    }

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  }

  if(token) {
    if(checkTokenExpiration(token)) {
      authService.logout();
      toastService.info('Your session has expired. Please log in again.');
    } else {
      // Token is valid, clone the request and add the Authorization header
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(clonedRequest);
    }
  }
  return next(req);
};
