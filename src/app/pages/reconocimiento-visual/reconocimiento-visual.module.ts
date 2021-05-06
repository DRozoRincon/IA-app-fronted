import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReconocimientoVisualPageRoutingModule } from './reconocimiento-visual-routing.module';

import { ReconocimientoVisualPage } from './reconocimiento-visual.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReconocimientoVisualPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReconocimientoVisualPage]
})
export class ReconocimientoVisualPageModule {}
