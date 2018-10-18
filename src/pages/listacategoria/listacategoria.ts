import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { CategoriasProvider, Categoria } from '../../providers/categorias/categorias';

/**
 * Generated class for the ListacategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-listacategoria',
    templateUrl: 'listacategoria.html',
})
export class ListacategoriaPage {

    model: Categoria;
    categorias: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private categoriaProvider: CategoriasProvider) {
    }

    ionViewDidLoad() {

        this.categoriaProvider.getAll()

            .then( (result: any[]) => {

                if ( ! result) {

                    this.categorias = [
                        {name: 'Lanches', descr: 'Lanches feitos com produtos da melhor qualidade.', imagem: 'lanches.png'},
                        {name: 'Refeições', descr: 'Refeições completas para o seu almoço.', imagem: 'refeicoes.png'}];
                }
                else {

                    this.categorias = result;
                }
            })
            
            .catch( () => {

                this.toast.create({
                    message: 'Erro ao carregar as categorias.',
                    duration: 3000,
                    position: 'bottom'}).present();
            });
    }
}
