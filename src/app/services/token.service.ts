import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor() { }

  intercept(req, next){
    let token = localStorage.getItem('token') || '';
    const tokenInterceptor = req.clone({
      setHeaders:{
        'x-token': token
      }
    });
    return next.handle(tokenInterceptor);
  }

}
