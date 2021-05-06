import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IbmService {

  constructor(private http: HttpClient){}

  traduccionIBM(traduccionData):Observable<any>{
    return this.http.post(`${localStorage.getItem('urlServer')}/ia/traduccion`, traduccionData);
  }

  ibmNTL(ntlData):Observable<any>{
    return this.http.post(`${localStorage.getItem('urlServer')}/ia/analisis-lenguaje`, {texto: ntlData});
  }

  textoToDiscursoIBM(textToSpeechData):Observable<any>{
    return this.http.post(`${localStorage.getItem('urlServer')}/ia/texto-discurso`, textToSpeechData);
  }

  reconocimientoImagenIBM(imgName):Observable<any>{
    return this.http.get(`${localStorage.getItem('urlServer')}/ia/reconocimiento-imagenes?img=${imgName}`);
  }

  discursoToTexto(audioName):Observable<any>{
    return this.http.get(`${localStorage.getItem('urlServer')}/ia/discurso-texto?audio=${audioName}`);
  }
}
