import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IbmService } from 'src/app/services/ibm.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';

@Component({
  selector: 'app-traduccion',
  templateUrl: './traduccion.page.html',
  styleUrls: ['./traduccion.page.scss'],
})
export class TraduccionPage implements OnInit {

  contenidoPost = {
    tipoPublicacion: 'traducción',
    files: [],
    textoPost: ''
  }

  public formTraduccionData: FormGroup;

  constructor(private _formBuilder: FormBuilder, private ibmServices: IbmService, private uiUserServices: UiUserService, private postServices: PostsService, private navController: NavController) { 
    this.buildForms();
  }

  ngOnInit() {
  
  }

  buildForms(){
    this.formTraduccionData = this._formBuilder.group({
      lenguaje: ['', [Validators.required]],
      texto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(2500)]]
    });
  }

  async ibmTraduccion(){
    await this.uiUserServices.loadingStart('Procesando información');
    this.ibmServices.traduccionIBM(this.formTraduccionData.value).subscribe(
      res=>{
        this.uiUserServices.loadingFinish();
        if(!res.ok){
          this.uiUserServices.alertaInformativa(res.mensaje);
        }else{
          this.textoPost(res.resultado);
        }
      },
      err=>console.log(err)
    )
    
  }

  textoPost(resultado: string){
    const html = `
    <p><strong>Texto a traducir: </strong>${this.formTraduccionData.value.texto}</p>
    <p><strong>Resultado (${this.formTraduccionData.value.lenguaje}): </strong>${resultado}</p>
    `;
    this.contenidoPost.textoPost = html;
  }

  async publicarPost(){
    await this.uiUserServices.loadingStart('Publicando post');
    await this.postServices.publicarPost(this.contenidoPost);
    this.uiUserServices.loadingFinish();
    this.navController.navigateRoot('/aplicacion/tabs/tab3', {animated: true});
  }

}
