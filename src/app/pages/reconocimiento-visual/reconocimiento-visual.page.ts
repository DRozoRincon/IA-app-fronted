import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IbmService } from 'src/app/services/ibm.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';

@Component({
  selector: 'app-reconocimiento-visual',
  templateUrl: './reconocimiento-visual.page.html',
  styleUrls: ['./reconocimiento-visual.page.scss'],
})
export class ReconocimientoVisualPage implements OnInit, OnDestroy {

  contenidoPost = {
    tipoPublicacion: 'reconocimiento de imagen',
    tipoFile: 'image',
    files: [],
    textoPost: ''
  }

  imgPath = [];
  imagenSubidaToServer: boolean = false;
  eliminarArchivosDelServidor: boolean = false;

  constructor(private ibmServices: IbmService, private uiUserServices: UiUserService, private postServices: PostsService, private navController: NavController) {
   }


  ngOnInit() {
  }

  gettingImgPathFromComponent(imgPath){
    this.imgPath = imgPath;
    if(this.imgPath.length == 0 && this.imagenSubidaToServer){
      this.contenidoPost.textoPost = '';
      this.imagenSubidaToServer = false;
      this.eliminarArchivosDelServidor = false;
      this.postServices.eliminarArchivosEnTemp().subscribe(
        res => {
          this.uiUserServices.mensajeToast('La imagen anterior fue eliminada!');
        },
        err => console.log(err)
      );
    }
  }

  async reconocimientoImagen(){
    await this.uiUserServices.loadingStart('Procesando información');
    let nombreArchivo = await this.subirImagenAservidor();
    this.ibmServices.reconocimientoImagenIBM(nombreArchivo).subscribe(
      res=>{
        this.uiUserServices.loadingFinish();
        this.eliminarArchivosDelServidor = true;
        this.textoPost(res.result, nombreArchivo);
      },err=>console.log(err)
    )
  }

  async subirImagenAservidor():Promise<any>{
    
    let blob = await fetch(this.imgPath[0]).then(r => r.blob());
    
    let nombreArchivo = await new Promise( resolve => {
      this.postServices.subirArchivosPost(blob, 'image').subscribe(
        res=> {
          this.imagenSubidaToServer = true;
          resolve(res.nombreArchivo);
        },
        err=>console.log(err)
      );
    });
    
    return nombreArchivo;
  }

  textoPost(resultado: any, nombreArchivo: string){
    let clase = '';
    resultado.forEach((result) => {
      clase = clase + `${result.class} (${result.score}), `;
    });
    let html = `
    <p><strong>Imagen: </strong>${nombreArchivo}</p>
    <p><strong>Resultado: </strong>${clase.slice(0,-2)}</p>
    `;
    this.contenidoPost.textoPost = html;
  }

  async publicarPost(){
    this.eliminarArchivosDelServidor = false;
    await this.uiUserServices.loadingStart('Publicando post');
    await this.postServices.publicarPost(this.contenidoPost);
    this.uiUserServices.loadingFinish();
    this.navController.navigateRoot('/aplicacion/tabs/tab3', {animated: true});
  }

  ngOnDestroy(){
    if(this.eliminarArchivosDelServidor){
      this.postServices.eliminarArchivosEnTemp().subscribe(
        res => this.uiUserServices.alertaInformativa(res.mensaje),
        err => console.log(err)
      );
    }
  }

}
