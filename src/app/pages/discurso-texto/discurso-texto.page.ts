import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IbmService } from 'src/app/services/ibm.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-discurso-texto',
  templateUrl: './discurso-texto.page.html',
  styleUrls: ['./discurso-texto.page.scss'],
})
export class DiscursoTextoPage implements OnInit, OnDestroy {

  contenidoPost = {
    tipoPublicacion: 'discurso a texto',
    tipoFile: 'audio',
    files: [],
    textoPost: ''
  }

  
  urlAudioFile: string = this.file.externalRootDirectory + 'audioIApp.wav';
  audioFileCreted: boolean = false;
  recording: boolean = false;
  audioSubidoToServer: boolean = false;
  eliminarArchivosDelServidor: boolean = false;
  audioFile: MediaObject = this.media.create(this.urlAudioFile);
  audio: File;
  audioName: string;
  
  constructor(private media:Media, private file:File, private ibmServices: IbmService, private uiUserServices: UiUserService, private postServices: PostsService, private navController: NavController) { }

  ngOnInit() {}

  empezarGrabacion(){
    this.recording = true;
    this.audioFileCreted = false;
    this.audioFile.release();
    this.audioFile.startRecord();
  }

  async detenerGrabacion(){
    this.recording = false;
    this.audioFile.stopRecord();
    this.audioFile.play();
    this.audioFileCreted = true;
  }

  obtenerAudio(dataAudio){
    this.audio = dataAudio.target.files[0];
    this.audioName = dataAudio.target.files[0].name;
  }


  async textoToDiscurso(){
    this.eliminarArchivosDelServidor = true;
    await this.uiUserServices.loadingStart('Procesando información');
    if(this.audioSubidoToServer) await this.eliminarArchivosServidor();
    let nombreArchivo = await this.subirAudioAservidor();
    this.ibmServices.discursoToTexto(nombreArchivo).subscribe(
      res => {
        this.uiUserServices.loadingFinish();
        this.textoPost(res.result, nombreArchivo);
        if(res.result.confidence <= 0.65) this.uiUserServices.alertaInformativa('Para obtener un mejor score te recomendamos grabaciones de voz en ingles y con una buena pronunciación');
      }, err => {this.uiUserServices.alertaInformativa('Lo sentimos hubo un error en el procesamiento del audio!'); console.log(err)}
    );
  }

  async subirAudioAservidor():Promise<any>{    

    let nombreArchivo = await new Promise( resolve => {
      this.postServices.subirArchivosPost(this.audio, 'audio').subscribe(
        res=> {
          this.audioSubidoToServer = true;
          resolve(res.nombreArchivo);
        },
        err=>console.log(err)
      );
    });

    return nombreArchivo;
  }

  async eliminarArchivosServidor(){
    await new Promise<void>( resolve => {
      this.postServices.eliminarArchivosEnTemp().subscribe(
        res => {
          this.uiUserServices.mensajeToast('EL audio anterior fue eliminado!');
          resolve();
        },
        err => console.log(err)
      );
    });
  }

  textoPost(resultado: any, nombreArchivo: string){
    let html = `
    <p><strong>Audio: </strong>${nombreArchivo}</p>
    <p><strong>Resultado (${resultado.confidence}): </strong>${resultado.transcript}</p>
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
