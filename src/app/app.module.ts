import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { TokenService } from './services/token.service';
import { AuthGuard } from './auth/auth.guard'; // se debe importar en routing
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media,
    File
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
