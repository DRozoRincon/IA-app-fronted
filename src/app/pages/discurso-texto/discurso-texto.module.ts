import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscursoTextoPageRoutingModule } from './discurso-texto-routing.module';

import { DiscursoTextoPage } from './discurso-texto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscursoTextoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DiscursoTextoPage]
})
export class DiscursoTextoPageModule {}
