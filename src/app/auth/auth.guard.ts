import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private navController: NavController){}
  
  canActivate(){
    if(this.userService.logueado()){ // importamos el servicio que nos da informacion de si el token existe
      return true;
    }
    this.navController.navigateRoot([''], {animated: true});
    return false;
  }
  
}
