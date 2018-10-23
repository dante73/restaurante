import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutosProvider, Produto } from '../../providers/produtos/produtos';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  produto: Produto;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private produtoProvider: ProdutosProvider) {

    this.produto = new Produto();

    if (this.navParams.data.produtoId) {

        this.produtoProvider.read(this.navParams.data.produtoId)
            .then( (result: any) => {
                this.produto = result;
            });
    }
  }
}
