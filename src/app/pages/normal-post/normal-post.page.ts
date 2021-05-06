import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';
import { LoadingController, NavController,  } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-normal-post',
  templateUrl: './normal-post.page.html',
  styleUrls: ['./normal-post.page.scss'],
})
export class NormalPostPage implements OnInit {

  contenidoPost = {
    tipoPublicacion: 'post',
    tipoFile: 'image',
    files: [],
    textoPost: '',
    coords: null
  }

  imgsPath = [];

  getPosicion: boolean = false;
  cargandoGeo: boolean = false;

  constructor(private uiUserServices: UiUserService, private postServices: PostsService, public loadingController: LoadingController, private navController: NavController) { }

  ngOnInit() {
  }

  async getGeo(){
    if(this.getPosicion){
      this.cargandoGeo = true;
      const coordinates = await Geolocation.getCurrentPosition();
      this.contenidoPost.coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
      this.cargandoGeo = false;
    }else{
      this.cargandoGeo = false;
      return;
    }
  }

  gettingImgPathFromComponent(imgsPath){
    this.imgsPath = imgsPath;
  }

  async subirImagenAservidor(){
    if(this.imgsPath){
      for(let index = 0; index < this.imgsPath.length; index++){
        let blob = await fetch(this.imgsPath[index]).then(r => r.blob());
          
        await new Promise<void>( resolve => {
          this.postServices.subirArchivosPost(blob, 'image').subscribe(
            res=> {
              resolve();
            },
            err=>console.log(err)
          );
        });
      }
    }
  }

  async publicarPost(){
    await this.uiUserServices.loadingStart('Publicando post');
    await this.subirImagenAservidor();
    await this.postServices.publicarPost(this.contenidoPost);
    this.uiUserServices.loadingFinish();
    this.navController.navigateRoot('/aplicacion/tabs/tab3', {animated: true});
  }

}
