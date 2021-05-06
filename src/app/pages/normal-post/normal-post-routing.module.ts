import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NormalPostPage } from './normal-post.page';

const routes: Routes = [
  {
    path: '',
    component: NormalPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NormalPostPageRoutingModule {}
