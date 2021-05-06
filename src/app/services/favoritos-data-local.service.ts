import { Injectable, EventEmitter } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FavoritosDataLocalService {

  usuarioActual: string = '';
  postFavoritos = [];
  favoritosSubscripcion = new EventEmitter();

  constructor() { 
    this.cargarFavoritos();
  }

  async guardarPelicula(post: Post){

    let  exist = await this.verificarExistencia(post._id);

    if(!exist) {
      this.postFavoritos.unshift(post);
      await Storage.set({key: this.usuarioActual, value: JSON.stringify(this.postFavoritos)});
    }
  }

  async cargarFavoritos(){
    try{
      this.usuarioActual = JSON.parse(localStorage.getItem('usuario'))._id;
    }catch(err){
      
    }
    let postFavoritos = await Storage.get({key: this.usuarioActual});
    this.postFavoritos = JSON.parse(postFavoritos.value) || [];
    return this.postFavoritos;
  }

  async verificarExistencia(idPost: string){
    const existe = await this.postFavoritos.find(postN => postN._id == idPost);
    return (existe)? true:false;
  }

  async eliminarFavorito(idPost: string){
    this.postFavoritos = this.postFavoritos.filter(postN => postN._id != idPost);
    await Storage.set({key: this.usuarioActual, value: JSON.stringify(this.postFavoritos)});
    this.favoritosSubscripcion.emit(this.postFavoritos);
  }
}
