import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Creditos, Genre, PeliculaDetalles, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T> ( query: string ){
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es&include_adult=true`;

    return this.http.get<T>( query );
  }

  getPopulares(){

    this.popularesPage++;

    const query = `/discover/movie?short_by=popularity.desc&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes =hoy.getMonth() + 1;

    let mesString;

    if(mes < 10){
      mesString = '0' + mes;
    }else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPeliculaDetalles(id: string){
    return this.ejecutarQuery<PeliculaDetalles>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string){
    return this.ejecutarQuery<Creditos>(`/movie/${id}/credits?a=1`);
  }

  getSearchPelicula(search: string){
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${search}`);
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise <Genre[]> (resolve =>{
      this.ejecutarQuery('/genre/movie/list?a=1')
      .subscribe((resp: any) => {
        this.generos = resp['genres'] as Genre[];
        // console.log(this.generos);
        resolve(this.generos);
      });
      
    });

  }

}
