import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NormalPostPageRoutingModule } from './normal-post-routing.module';

import { NormalPostPage } from './normal-post.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NormalPostPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NormalPostPage]
})
export class NormalPostPageModule {}
