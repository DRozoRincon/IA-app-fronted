import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { FavoritosDataLocalService } from 'src/app/services/favoritos-data-local.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  postFavoritos: Post[] = [];
  constructor(private favoritosServices: FavoritosDataLocalService) { }

  async ngOnInit() {
    this.postFavoritos = await this.favoritosServices.cargarFavoritos();
    this.favoritosServices.favoritosSubscripcion.subscribe(
      postsFavoritos => this.postFavoritos = postsFavoritos
    )
  }

}
