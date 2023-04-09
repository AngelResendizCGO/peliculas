import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalles } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  peliculas: PeliculaDetalles[] = [];

  constructor( private storage: Storage, private toastCtrl: ToastController) {
    this.init();
    this.cargarFavoritos();
  }

  async presentToast({ pos, mens, ic }: { pos: 'top' | 'middle' | 'bottom'; mens: string; ic: string; }) {
    // position: 'top' | 'middle' | 'bottom'
    const toast = await this.toastCtrl.create({
      icon: ic,
      message: mens,
      duration: 1500,
      position: pos
    });
    await toast.present();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalles){
    let existe = false;
    let mensaje = '';

    for (const  peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de Favoritos';
      this.presentToast({ pos: 'middle', mens: mensaje, ic: 'trash-outline' });
    }else{
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a Favoritos';
      this.presentToast({ pos: 'middle', mens: mensaje, ic: 'star-outline' });
    }

    this.storage?.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: any){
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe)? true : false;
  }
  
}
