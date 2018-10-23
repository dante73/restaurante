import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { CategoriasProvider, Categoria } from '../../providers/categorias/categorias';
import { ProdutosProvider, Produto } from '../../providers/produtos/produtos';
import { ListaprodutoporcategoriaPage } from '../../pages/listaprodutoporcategoria/listaprodutoporcategoria';
import { PratododiaPage } from '../../pages/pratododia/pratododia';

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
        private categoriaProvider: CategoriasProvider,
        private produtoProvider: ProdutosProvider) {
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {

        this.categoriaProvider.getAll()

            .then(
                (result: any[]) => {

                if ( ! result) {

                    this.categorias = [
                        {name: 'Atenção', descr: 'Dados não foram retornados.', imagem: 'logo.png'}];
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

    openProdutoPage(id: number) {
        this.navCtrl.push(ListaprodutoporcategoriaPage, { id: id });
    }

    openPratoDoDiaPage() {
        this.navCtrl.push(PratododiaPage);
    }
}
