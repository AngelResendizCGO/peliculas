import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  getFeature(){
    return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2000-09-15&primary_release_date.lte=2014-10-22&api_key=0eae98972653d037575a7cab39ef9b5d&language=es&include_image_language=es');
  }
}
