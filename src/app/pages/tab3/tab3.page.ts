import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UpdateUserComponent } from 'src/app/components/update-user/update-user.component';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiUserService } from 'src/app/services/ui-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public datosUsuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  constructor(private modalCtrl: ModalController, private userService: UserService, private uiUserService:UiUserService, private navController: NavController) {}

  async modalActualizarDatos(){
    const modal =  await this.modalCtrl.create({
      component: UpdateUserComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    if(data) this.datosUsuario.nombre = data;
  }

  cerrarSesion(){
    this.userService.cerrarSesion();
    this.uiUserService.mensajeToast(`Vuelve pronto ${this.datosUsuario.nombre}`);
    this.navController.navigateRoot([''], {animated: true});
  }
}
