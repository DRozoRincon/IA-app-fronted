import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraduccionPageRoutingModule } from './traduccion-routing.module';

import { TraduccionPage } from './traduccion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraduccionPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TraduccionPage]
})
export class TraduccionPageModule {}
