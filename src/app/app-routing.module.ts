import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';  // el protector de rutas

const routes: Routes = [
  {
    path: 'aplicacion',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'reconocimiento-visual',
    loadChildren: () => import('./pages/reconocimiento-visual/reconocimiento-visual.module').then( m => m.ReconocimientoVisualPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'discurso-texto',
    loadChildren: () => import('./pages/discurso-texto/discurso-texto.module').then( m => m.DiscursoTextoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'texto-discurso',
    loadChildren: () => import('./pages/texto-discurso/texto-discurso.module').then( m => m.TextoDiscursoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'estudio-lenguaje',
    loadChildren: () => import('./pages/estudio-lenguaje/estudio-lenguaje.module').then( m => m.EstudioLenguajePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'traduccion',
    loadChildren: () => import('./pages/traduccion/traduccion.module').then( m => m.TraduccionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'normal-post',
    loadChildren: () => import('./pages/normal-post/normal-post.module').then( m => m.NormalPostPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
