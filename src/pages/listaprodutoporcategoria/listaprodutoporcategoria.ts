import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CategoriasProvider, Categoria } from '../../providers/categorias/categorias';
import { ProdutosProvider, Produto } from '../../providers/produtos/produtos';
import { ProdutoPage } from '../../pages/produto/produto';

/**
 * Generated class for the ListaprodutoporcategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaprodutoporcategoria',
  templateUrl: 'listaprodutoporcategoria.html',
})
export class ListaprodutoporcategoriaPage {

  produtos: any[];

  categoria: Categoria;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public toast: ToastController,
      private categoriaProvider: CategoriasProvider,
      private produtoProvider: ProdutosProvider) {

      this.categoria = new Categoria();

      if (this.navParams.data.id) {

          this.categoriaProvider.read(this.navParams.data.id)
              .then( (result: any) => {
                  this.categoria = result;

                  this.produtoProvider.getAll(null, this.categoria.id)
                      .then( (result: any[]) => {
                          this.produtos = result;
                      })
                      .catch( () => {
                          this.toast.create({
                              message: 'Erro ao carregar os produtos.',
                              duration: 3000,
                              position: 'bottom'}).present();
                      });
              } );
      }
  }

  ionViewDidLoad() {
      if (this.navParams.data.id) {
          this.categoriaProvider.read(this.navParams.data.id)
              .then( (result: any) => {
                  this.categoria = result;
                  this.produtoProvider.getAll(null, this.categoria.id)
                      .then( (result: any[]) => {
                          this.produtos = result;
                      })
                      .catch( () => {
                          this.toast.create({
                              message: 'Erro ao carregar os produtos.',
                              duration: 3000,
                              position: 'bottom'}).present();
                      });
              } );
      }
  }

  openProdutoPage(id: number) {
      this.navCtrl.push(ProdutoPage, { produtoId: id });
  }
}
