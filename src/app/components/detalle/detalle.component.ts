import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalles } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input() id: string = "";

  pelicula: PeliculaDetalles = {};
  actores: Cast [] = [];
  oculto = 150;
  estrella: string = '';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebeteen: 0
  };

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService ) { }

  async ngOnInit() {

    const existe = await this.dataLocal.existePelicula(this.id);

    if (existe) {
      this.estrella = 'star'
    }else{
      this.estrella = 'star-outline';
    }

    this.moviesService.getPeliculaDetalles(this.id).subscribe( resp => {
      this.pelicula = resp;
      console.log(this.pelicula);
    });

    this.moviesService.getActoresPelicula(this.id).subscribe( resp => {
      this.actores = resp.cast;
      console.log(this.actores);
    });

  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
