import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from './services/user.service';


import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { FavoritosDataLocalService } from './services/favoritos-data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private navController: NavController, private platform: Platform, private favoritosService: FavoritosDataLocalService) {
    this.initializeApp();
    if(this.userService.logueado()){ // importamos el servicio que nos da informacion de si el token existe
      this.cargarPostsFavoritos();
      this.navController.navigateRoot('/aplicacion/tabs/tab1', {animated: true});
    }
  }

  async cargarPostsFavoritos(){
    await this.favoritosService.cargarFavoritos();
  }
  
  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#ffffff' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
