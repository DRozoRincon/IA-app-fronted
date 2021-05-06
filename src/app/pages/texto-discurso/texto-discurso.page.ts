import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IbmService } from 'src/app/services/ibm.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';


const urlFile = environment.urlFile;

@Component({
  selector: 'app-texto-discurso',
  templateUrl: './texto-discurso.page.html',
  styleUrls: ['./texto-discurso.page.scss'],
})
export class TextoDiscursoPage implements OnInit, OnDestroy {

  contenidoPost = {
    tipoPublicacion: 'texto a discurso',
    tipoFile: 'audio',
    files: [],
    textoPost: ''
  }
  datosUsuarioLogueado:Usuario = JSON.parse(localStorage.getItem('usuario'));
  audioUrl: string;
  eliminarArchivosDelServidor: boolean = false;

  public formTextToDiscurso: FormGroup;

  constructor(private _formBuilder: FormBuilder, private ibmServices: IbmService, private uiUserServices: UiUserService, private postServices: PostsService, private navController: NavController) { 
    this.buildForms();
  }

  ngOnInit() {
  }

  buildForms(){
    this.formTextToDiscurso = this._formBuilder.group({
      voz: ['', [Validators.required]],
      texto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(2500)]]
    });  
  }

  async textoToSpeech(){
    if(this.audioUrl) await this.eliminarArchivoServidor();
    this.formTextToDiscurso.value.lenguaje = this.formTextToDiscurso.value.voz.slice(0,2);
    await this.uiUserServices.loadingStart('Procesando información');
    this.ibmServices.textoToDiscursoIBM(this.formTextToDiscurso.value).subscribe(
      res=>{
        this.uiUserServices.loadingFinish();
        if(!res.ok){
          this.uiUserServices.alertaInformativa(res.mensaje);
        }else{
          this.eliminarArchivosDelServidor = true;
          this.audioUrl = `${localStorage.getItem('urlServer')}${urlFile}${this.datosUsuarioLogueado._id}/${res.nombreAudio}/audio?temp=true`;
          this.textoPost(res.nombreAudio);
        }
      }, err=>console.log(err)
    )
  }

  textoPost(resultado: any){
    const html = `
    <p><strong>Audio generado (${this.formTextToDiscurso.value.voz}): </strong>${resultado}</p>
    <p><strong>Texto del discurso: </strong>${this.formTextToDiscurso.value.texto}</p>
    `;
    this.contenidoPost.textoPost = html;
  }

  async eliminarArchivoServidor(){
    await this.postServices.eliminarArchivosEnTemp().subscribe(
      res => this.uiUserServices.mensajeToast('El audio anterior fue eliminado!'),
      err => console.log(err)
    );
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
