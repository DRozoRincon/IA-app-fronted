import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {

  public nombre: FormControl;
  public dataUser: Usuario = JSON.parse(localStorage.getItem('usuario'));
  constructor(private userService: UserService, private modalCtrl: ModalController){
    this.buildForms();
  }

  ngOnInit() {}

  buildForms(){
    this.nombre = new FormControl(this.dataUser.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(60)])
  }

  actualizarDatos(){
    this.userService.actualizarDatos(this.nombre.value).subscribe(
      res => {
        if(res.ok){
          this.userService.guardarToken(res.token);
          this.modalCtrl.dismiss(this.nombre.value);
        }
      }, err => console.log(err)
    )
  }
}
