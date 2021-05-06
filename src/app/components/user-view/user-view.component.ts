import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {

  @Input() datosUsuario: Usuario;
  @Input() header: boolean = false;
  @ViewChild('infiniteScrollUserView') infiniteScroll: IonInfiniteScroll; // viewchild es para obtener algun elemento del html

  posts: Post[] = [];
  pagina: number = 0;
  constructor(private postsServices: PostsService) { }

  ngOnInit(){
    this.obtenerPostsUsuario(this.datosUsuario._id);
    this.postsServices.nuevoPost.subscribe(
      post=>this.posts.unshift(post)
    );
  }

  refrescarPosts(event){
    this.pagina = 0;
    this.postsServices.getPosts(this.pagina+=1, this.datosUsuario._id).subscribe(
      res => {
        this.infiniteScroll.disabled = false;
        event.target.complete();
        this.posts = [];
        this.posts.push(...res.posts)
      },
      err => console.log(err)
    )
  }

  obtenerPostsUsuario(usuarioId){
    this.postsServices.getPosts(this.pagina+=1, usuarioId).subscribe(
      res => this.posts.push(...res.posts),
      err => console.log(err)
    )
  }

  cargarMasPosts(event){
    this.postsServices.getPosts(this.pagina+=1, this.datosUsuario._id).subscribe(
      res => {
        if(res.posts.length != 0){
          event.target.complete(); // para decir que ya se completo el cargado de los elementos
          this.posts.push(...res.posts);
        }else{
          event.target.complete(); // para decir que ya se completo el cargado de los elementos
          this.infiniteScroll.disabled = true;
        }
      },
      err => console.log(err)
    )
  }
}
