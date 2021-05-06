import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { UserViewComponent } from '../user-view/user-view.component';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[] = [];
  @Input() profilePosts: boolean = false;
  
  datosUsuarioLogueado:Usuario = JSON.parse(localStorage.getItem('usuario'));
  urlFile = `${localStorage.getItem('urlServer')}${environment.urlFile}`;

  constructor(private modalCtrl: ModalController, private navController: NavController){ }

  ngOnInit(){

  }

  async mostrarUsuario(datosUsuario){
    if(datosUsuario._id != this.datosUsuarioLogueado._id){
      const modal =  await this.modalCtrl.create({
        component: UserViewComponent,
        componentProps: { // informacion que mandamos al page hijo modal-info
          datosUsuario: datosUsuario,
          header: true
        }
      });
  
      await modal.present();
    }else{
      this.navController.navigateRoot('/aplicacion/tabs/tab3', {animated: true});
    }
  }

  eliminarPostDelArray(postAeliminar){
    this.posts = this.posts.filter(postN => postN._id != postAeliminar._id);
  }

}
