import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';// modulo que nos permite hacer formularios reactivos
import { RouterModule } from '@angular/router';// nos permite navegar entre paginas

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
