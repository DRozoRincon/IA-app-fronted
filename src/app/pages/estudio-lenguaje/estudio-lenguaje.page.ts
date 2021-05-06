import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IbmService } from 'src/app/services/ibm.service';
import { PostsService } from 'src/app/services/posts.service';
import { UiUserService } from 'src/app/services/ui-user.service';

@Component({
  selector: 'app-estudio-lenguaje',
  templateUrl: './estudio-lenguaje.page.html',
  styleUrls: ['./estudio-lenguaje.page.scss'],
})
export class EstudioLenguajePage implements OnInit {

  contenidoPost = {
    tipoPublicacion: 'análisis lenguaje',
    files: [],
    textoPost: ''
  }

  public textoEstudioLneguajeData: FormControl;

  constructor(private ibmServices: IbmService, private uiUserServices: UiUserService, private postServices: PostsService, private navController: NavController){
    this.buildForms();
  }

  ngOnInit() {
    
  }

  buildForms(){
    this.textoEstudioLneguajeData = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2500)])
  }

  async ibmNTL(){
    await this.uiUserServices.loadingStart('Procesando información');
    this.ibmServices.ibmNTL(this.textoEstudioLneguajeData.value).subscribe(
      res=>{
        this.uiUserServices.loadingFinish();
        if(!res.ok){
          console.log(res);
        }else{
          this.textoPost(res.resultado);
        }
      }, err=>console.log(err)
    )
  }

  textoPost(resultado: any){
    let keywords = '';
    let concepts = '';
    let categories = '';
    resultado.keywords.forEach((keywordData) => {
      keywords = keywords + `${keywordData.text} (${keywordData.relevance}), `;
    });
    resultado.concepts.forEach((conceptsData) => {
      concepts = concepts + `${conceptsData.text} (${conceptsData.relevance}), `;
    });
    resultado.categories.forEach((categoriesData) => {
      categories = categories + `${categoriesData.label} (${categoriesData.score}), `;
    });
    const html = `
    <p><strong>Texto analizado: </strong>${this.textoEstudioLneguajeData.value}</p>
    <p><strong>Análisis</strong></p>
    <p><strong>Idioma: </strong>${resultado.language}</p>
    <p><strong>Sentimiento: </strong>${resultado.sentiment.document.label}</p>
    <p><strong>Palabras clave: </strong>${keywords.slice(0,-2)}</p>
    <p><strong>Conceptos: </strong>${concepts.slice(0,-2)}</p>
    <p><strong>Categorías a la que pertenece: </strong>${categories.slice(0,-2)}</p>
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
