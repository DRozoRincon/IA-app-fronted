import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UiUserService } from 'src/app/services/ui-user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private navController: NavController, private uiUserService: UiUserService) {}

  redirigirIApost(url: string){
    if(!navigator.onLine){
      this.uiUserService.mensajeToast('Debes estar conectado a internet!');
    }else this.navController.navigateRoot(url, {animated: true});
  }

}
