import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextoDiscursoPageRoutingModule } from './texto-discurso-routing.module';

import { TextoDiscursoPage } from './texto-discurso.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextoDiscursoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [TextoDiscursoPage]
})
export class TextoDiscursoPageModule {}
