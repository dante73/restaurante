import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';

/**
 * Generated class for the PratododiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pratododia',
  templateUrl: 'pratododia.html',
})
export class PratododiaPage {

  produtos: any[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public toast: ToastController,
      private produtoProvider: ProdutosProvider) {
  }

  ionViewDidLoad() {

      this.produtoProvider.getAll(null, null, 1)

          .then(
              (result: any[]) => {

                  if ( ! result) {

                      this.produtos = [
                          {name: 'Atenção', descr: 'Dados não foram retornados.', imagem: 'logo.png'}];
                  }
                  else {

                      this.produtos = result;
                  }
              })
          .catch( () => {

              this.toast.create({
                  message: 'Erro ao carregar os pratos do dia.',
                  duration: 3000,
                  position: 'bottom'}).present();
          });
  }
}
