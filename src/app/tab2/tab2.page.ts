import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  peliculasBusqueda: Pelicula[] = [];
  buscando: boolean = false;
  textoBuscar: string = "";
  ideas: string[] = ['Spiderman', 'Avenger', 'El Señor de los Anillos', 'John Wick'];

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) {}

  buscar(event: any){
    this.textoBuscar = event.detail.value;

    if (this.textoBuscar.length === 0) {
      this.buscando = false;
      this.peliculasBusqueda = [];
      return;
    }

    this.buscando = true;
    this.moviesService.getSearchPelicula(this.textoBuscar).subscribe( resp =>{
      this.peliculasBusqueda = resp.results;
      this.buscando = false;
      console.log(this.peliculasBusqueda);
    } );
  }

  select(idea: string){
    this.textoBuscar = idea;
  }

  async detallePelicula(id: number){
    console.log(id);
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
