import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { FavoritosDataLocalService } from 'src/app/services/favoritos-data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('infiniteScrollPostsView') infiniteScroll: IonInfiniteScroll; // viewchild es para obtener algun elemento del html
  posts: Post[] = [];
  pagina: number = 0;

  constructor(private postsServices: PostsService) {
    
  }

  ngOnInit(){
    this.postsServices.getPosts(this.pagina+=1).subscribe(
      res => this.posts.push(...res.posts),
      err => console.log(err)
    )
    this.postsServices.nuevoPost.subscribe(
      post=>this.posts.unshift(post)
    );
  }
 
  refrescarPosts(event){
    this.pagina = 0;
    this.postsServices.getPosts(this.pagina+=1).subscribe(
      res => {
        this.infiniteScroll.disabled = false;
        event.target.complete();
        this.posts = [];
        this.posts.push(...res.posts)
      },
      err => console.log(err)
    )
  }

  cargarMasPosts(event){
    this.postsServices.getPosts(this.pagina+=1).subscribe(
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
