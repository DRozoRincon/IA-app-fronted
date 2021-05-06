import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiUserService {

  public cargando;
  constructor(public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController) { }

  async alertaInformativa(mensaje: string){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadingStart(msj: string){
    this.cargando = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msj
    });

    this.cargando.present();
  }

  loadingFinish(){
    this.cargando.dismiss();
  }

  async mensajeToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
}
