import { Component } from '@angular/core';
import { Genre, Pelicula, PeliculaDetalles } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalles[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private dataLocal: DataLocalService, private modalCtrl: ModalController, private MoviesService: MoviesService) {}

  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();
    // console.log(this.peliculas);
    this.generos = await this.MoviesService.cargarGeneros();
    // console.log(this.generos[0].id);
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  async detallePelicula(id: any){
    console.log(id);
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalles[] ){
    this.favoritoGenero = [];

    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: this.peliculas.filter(peli => {
          return peli.genres?.find(genre => genre.id === genero.id );
        })
      });
    });
    console.log(this.favoritoGenero);
  }

}
