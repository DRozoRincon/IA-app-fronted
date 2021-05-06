import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { FavoritosDataLocalService } from 'src/app/services/favoritos-data-local.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-action-post',
  templateUrl: './action-post.component.html',
  styleUrls: ['./action-post.component.scss'],
})
export class ActionPostComponent implements OnInit {

  @Input() postData: Post;
  @Input() profilePosts: boolean;
  @Output() postParaEliminar = new EventEmitter<any>();

  idUsuarioLogueado: Usuario = JSON.parse(localStorage.getItem('usuario'))._id;
  permitirBorrarPost: boolean = false;

  postFavorito: boolean = false;
  constructor(private modalCtrl: ModalController, private favoritosServices: FavoritosDataLocalService, private uiServices: UiUserService, public alertController: AlertController, private postServices: PostsService) { }

  async ngOnInit(){
    // logica para permitir borrar datos
    if((this.idUsuarioLogueado == this.postData.usuario._id) && this.profilePosts) this.permitirBorrarPost = true;
    else this.permitirBorrarPost = false;
    // verificar existencia del post en favoritos
    this.postFavorito = await this.favoritosServices.verificarExistencia(this.postData._id);
  }

  async cambioDeEstadoDeFavorito(){
    if(this.postFavorito){ // se elimina de favoritos
      await this.favoritosServices.eliminarFavorito(this.postData._id);
    }else{ // se guarda en favoritos
      await this.favoritosServices.guardarPelicula(this.postData);
    }
    this.postFavorito = !this.postFavorito;
  }

  async mostrarUbicacion(){
    if(navigator.onLine){
      const modal = await this.modalCtrl.create({
        component: MapaComponent,
        componentProps: { // informacion que mandamos al page hijo modal-info
          coords: this.postData.coords
        }
      });
  
      await modal.present();
    }else{
      this.uiServices.mensajeToast('Debes estar conectado a internet!');
    }
  }

  async eliminarPost() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Se eliminara el post, ¿seguro deseas hacerlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: async () => {
            await this.uiServices.loadingStart('Eliminando post');
            this.postServices.eliminarPost(this.postData._id, this.idUsuarioLogueado).subscribe(
              (res:any) =>{
                if(res.ok){
                  this.postParaEliminar.emit(this.postData);
                  this.uiServices.loadingFinish();
                }
              }, err=>console.log(err)
            )
          }
        }
      ]
    });

    await alert.present();
  }

}
