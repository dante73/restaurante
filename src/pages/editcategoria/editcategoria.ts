import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CategoriasProvider, Categoria } from '../../providers/categorias/categorias';

/**
 * Generated class for the EditcategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcategoria',
  templateUrl: 'editcategoria.html',
})
export class EditcategoriaPage {

    model: Categoria;
    categorias: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private categoriaProvider: CategoriasProvider) {

        this.model = new Categoria();

        if (this.navParams.data.id) {

            this.categoriaProvider.read(this.navParams.data.id)
                .then( (result: any) => { this.model = result; } );
        }
    }

    ionViewDidLoad() {
        this.categorias = [
            {nome: 'Lanches', descr: 'Lanches feitos com produtos da melhor qualidade.', imagem: 'lanches.png'},
            {nome: 'Refeições', descr: 'Refeições completas para o seu almoço.', imagem: 'refeicoes.png'}];
        /*
        this.categoriaProvider.getAll()
            .then( (result: any[]) => {
                this.categorias = result;
            }).catch( () => {
                this.toast.create({
                    message: 'Erro ao carregar as categorias.',
                    duration: 3000,
                    position: 'bottom'}).present();
            });
        console.log('ionViewDidLoad EditcategoriaPage');
         */
    }

    save() {
        this.saveProduct()
            .then( () => {
                    this.toast.create({
                        message: 'Categoria salva com sucesso.',
                        duration: 3000,
                        position: 'bottom'})
                        .present();
                    this.navCtrl.pop();
                })
            .catch( () => {
                    this.toast.create({
                        message: 'Erro ao salvar a categoria.',
                        duration: 3000,
                        position: 'bottom'})
                        .present();
                });
    }

    private saveProduct() {
        if (this.model.id) {
            return this.categoriaProvider.update(this.model);
        }
        else {
            return this.categoriaProvider.create(this.model);
        }
    }
}
