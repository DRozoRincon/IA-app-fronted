import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';// modulo que nos permite hacer formularios reactivos

import { UpdateUserComponent } from './update-user/update-user.component';
import { UserViewComponent } from './user-view/user-view.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { CameraComponent } from './camera/camera.component';
import { ActionPostComponent } from './action-post/action-post.component';



@NgModule({
  declarations: [PostsComponent, UpdateUserComponent, UserViewComponent, HeaderComponent, MapaComponent, CameraComponent, ActionPostComponent],
  imports: [
    CommonModule, IonicModule, PipesModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports: [PostsComponent, UpdateUserComponent, UserViewComponent, HeaderComponent, CameraComponent]
})
export class ComponentsModule { }
