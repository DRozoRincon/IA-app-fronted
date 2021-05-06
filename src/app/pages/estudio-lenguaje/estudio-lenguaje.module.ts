import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudioLenguajePageRoutingModule } from './estudio-lenguaje-routing.module';

import { EstudioLenguajePage } from './estudio-lenguaje.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudioLenguajePageRoutingModule,
    ComponentsModule, 
    ReactiveFormsModule
  ],
  declarations: [EstudioLenguajePage]
})
export class EstudioLenguajePageModule {}
