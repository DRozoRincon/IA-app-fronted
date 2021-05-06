import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario):Observable<any>{
    return this.http.post(localStorage.getItem('urlServer') + '/user/create', nuevoUsuario);
  }

  ingresar(datosUsuario):Observable<any>{
    return this.http.post(localStorage.getItem('urlServer') + '/user/login', datosUsuario);
  }

  actualizarDatos(datosUsuario):Observable<any>{
    return this.http.put(localStorage.getItem('urlServer') + '/user/update', {nombre: datosUsuario});
  }

  async guardarToken(token: string){
    localStorage.setItem('token', token);
    await this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(){
    return new Promise<void>( resolve => {
      this.http.get(localStorage.getItem('urlServer') + '/user/').subscribe(
        (res: any) => {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          resolve();
        },
        err => console.log(err)
      );
    });
  }

  comprobarUrlServidor():Observable<any>{
    return this.http.get(localStorage.getItem('urlServer') + '/user/comprobacion-url');
  }

  logueado(): boolean{ // metodo usado por guardian
    return !!localStorage.getItem('token');
  }

  cerrarSesion(){
    localStorage.removeItem('token');
  }

}
