export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  files?: string[];
  _id?: string;
  usuario?: Usuario;
  textoPost?: string;
  created?: string;
  coords?: string;
  tipoFile?: string;
  tipoPublicacion?: string
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
}