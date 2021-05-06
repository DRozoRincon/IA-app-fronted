import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { RespuestaPosts } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  nuevoPost = new EventEmitter();
  
  constructor(private http: HttpClient){

  }


  getPosts(pagina: number, usuarioId = ''):Observable<any>{
    return this.http.get<RespuestaPosts>(`${localStorage.getItem('urlServer')}/posts/?pagina=${pagina}&usuario=${usuarioId}`);
  }

  publicarPost(datosPost){

    return new Promise( resolve => {
      this.http.post(`${localStorage.getItem('urlServer')}/posts/create`, datosPost).subscribe(
        (res:any) => {
          this.nuevoPost.emit(res.post);
          resolve(true)
        },
        err => console.log(err)
      );
    });
    
  }

  eliminarPost(idPost, idUser){
    return this.http.delete(`${localStorage.getItem('urlServer')}/posts/eliminar-post/${idPost}/${idUser}`);
  }

  subirArchivosPost(file, type):Observable<any>{
    let formData = new FormData();
    formData.append("image", file);
    return this.http.post(`${localStorage.getItem('urlServer')}/posts/upload?type=${type}`, formData);
  }

  eliminarArchivosEnTemp():Observable<any>{
    return this.http.delete(`${localStorage.getItem('urlServer')}/posts/delete-files-temp`);
  }
}
