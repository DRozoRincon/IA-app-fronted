import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudioLenguajePage } from './estudio-lenguaje.page';

const routes: Routes = [
  {
    path: '',
    component: EstudioLenguajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudioLenguajePageRoutingModule {}
