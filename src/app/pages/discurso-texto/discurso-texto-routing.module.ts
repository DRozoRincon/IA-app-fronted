import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscursoTextoPage } from './discurso-texto.page';

const routes: Routes = [
  {
    path: '',
    component: DiscursoTextoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscursoTextoPageRoutingModule {}
