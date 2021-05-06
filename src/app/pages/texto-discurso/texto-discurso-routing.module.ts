import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextoDiscursoPage } from './texto-discurso.page';

const routes: Routes = [
  {
    path: '',
    component: TextoDiscursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextoDiscursoPageRoutingModule {}
