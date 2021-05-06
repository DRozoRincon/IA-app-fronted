import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UiUserService } from 'src/app/services/ui-user.service';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { FavoritosDataLocalService } from 'src/app/services/favoritos-data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesAccount') slides: IonSlides;
  public formLogin: FormGroup;
  public formRegistro: FormGroup;
  private _emailPatron: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private _pswPatron: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{2,100}$/;
  
  constructor(private _formBuilder: FormBuilder, private userService: UserService, private navController: NavController, private uiUserService:UiUserService, private alertCtrl: AlertController, private favortiosServices: FavoritosDataLocalService){
    this.buildForms();
    this.comprobarUrlServidor(true);
  }

  ngOnInit() {
    
  }
  ionViewDidEnter(){ // executed when DOM id rendered
    this.slides.lockSwipes(true);
  }

  private buildForms(){
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this._emailPatron), Validators.maxLength(50)]],
      contraseña: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern(this._pswPatron)]]
    });

    this.formRegistro = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this._emailPatron), Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      contraseña: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern(this._pswPatron)]],
      avatar: ['', [Validators.required]]
    })
  }

  public async ObtenerValorUrlServidor(){
    const alert = await this.alertCtrl.create({
      cssClass: 'buttonCss',
      header: 'Servidor',
      message: 'Pregunta cual es la url para la conexión al servidor e ingresala',
      inputs: [
        {
          name: 'url',
          type: 'text',
          placeholder: 'Servidor url',
          value: localStorage.getItem('urlServer') || ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.comprobarUrlServidor();
          }
        }, {
          text: 'Guardar',
          handler: (dataInput) => { // al dar al boton se recibir como en la funcion anonima/flecha un dato de los valros del input
            localStorage.setItem('urlServer', dataInput.url);
            this.comprobarUrlServidor(true);
          }
        }
      ]
    });

    await alert.present();
  }

  logIn(){
    this.userService.ingresar(this.formLogin.value).subscribe(
      async (res) => {
        if(res.ok){
          await this.userService.guardarToken(res.token);
          await this.favortiosServices.cargarFavoritos();
          this.navController.navigateRoot('/aplicacion/tabs/tab1', {animated: true});
        }
        else {
          this.formLogin.reset();
          this.uiUserService.alertaInformativa(res.mensaje);
        }
      }, err => console.log(err)
    )
  }

  comprobarUrlServidor(combrobarUrl = false, ingresarUrlValida = false){
    if(!localStorage.getItem('urlServer')){
      this.uiUserService.mensajeToast('No existe aun url para conexión a servidor!');
      this.ObtenerValorUrlServidor();
      return;
    }
    
    if(combrobarUrl){
      this.userService.comprobarUrlServidor().subscribe(
        res => {},
        err => this.comprobarUrlServidor(false, true)
      );
    }
    
    if(ingresarUrlValida){
      this.uiUserService.mensajeToast('La url no es valida!');
      this.ObtenerValorUrlServidor();
    }
  }

  registrarUsuario(){
    this.userService.crearUsuario(this.formRegistro.value).subscribe(
      async (res) => {
        if(res.ok){
          await this.userService.guardarToken(res.token);
          await this.favortiosServices.cargarFavoritos();
          this.navController.navigateRoot('/aplicacion/tabs/tab1', {animated: true});
        }else{
          this.uiUserService.alertaInformativa('El email ya esta en uso');
        }
        
      },err => console.log(err)
    );
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
