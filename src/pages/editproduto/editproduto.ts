import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ProdutosProvider, Produto } from '../../providers/produtos/produtos';

/**
 * Generated class for the EditprodutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editproduto',
  templateUrl: 'editproduto.html',
})
export class EditprodutoPage {

  model: Produto;
  produtos: any[];
  categorias: any[];
  imagens: any[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private toast: ToastController,
      private alertCtrl: AlertController,
      private categoriasProvider: CategoriasProvider,
      private produtosProvider: ProdutosProvider) {

      this.imagens = [
          'xsalada.png',
          'xbacon.png',
          'xmaio.png',
          'xtudo.png',
          'beirute.png',
          'bauru.png',
          'batatafrita.png',
          'mandiocafrita.png',
          'polentafrita.png',
          'bbacalhau.png',
          'fpassarinho.png',
          'feijoada.png',
          'strognoff.png',
          'pucheiro.png',
          'macarronada.png',
          'escondidinho.png',
          'pudim.png',
          'pupacoca.png',
          'mmaracuja.png',
          'carrenzs.png',
          'petitg.png',
          'cocaks.png',
          'coca350.png',
          'coca600.png',
          'coca2l.png',
          'coca25l.png'
      ];

      this.model = new Produto();

      if (this.navParams.data.id) {

          this.produtosProvider.read(this.navParams.data.id)
              .then( (result: any) => { this.model = result; } );
      }
  }

  ionViewDidLoad() {
      this.categoriasProvider.getAll()
          .then( (result: any[]) => {
              this.categorias = result;
          })
          .catch( () => {
              this.toast.create({
                  message: 'Erro ao carregar as categorias para produtos.',
                  duration: 3000,
                  position: 'bottom'}).present();
          });
      this.produtosProvider.getAll()
          .then( (result: any[]) => {
              this.produtos = result;
          })
          .catch( () => {
              this.toast.create({
                  message: 'Erro ao carregar os produtos.',
                  duration: 3000,
                  position: 'bottom'}).present();
          });
  }

  save() {
      this.saveProduto()
          .then( () => {
              this.toast.create({
                  message: 'Dados gravados com sucesso.',
                  duration: 3000,
                  position: 'bottom'})
                  .present();
              this.produtosProvider.getAll()
                  .then( (result: any[]) => {
                      this.produtos = result;
                      //this.navCtrl.pop();
                  })
                  .catch( () => {
                      this.toast.create({
                          message: 'Erro ao carregar os produtos.',
                          duration: 3000,
                          position: 'bottom'}).present();
                  });
          })
          .catch( () => {
              this.toast.create({
                  message: 'Erro ao salvar o produto.',
                  duration: 3000,
                  position: 'bottom'})
                  .present();
          });
  }

  open(id) {
      this.produtosProvider.read(id)
          .then( (result: any) => { this.model = result; } );
  }

  deleteIt(id) {

      let confirma = this.alertCtrl.create({
          title: 'Atenção !',
          message: 'Tem certeza de que quer excluir ?',
          buttons: [
              {
                  text: 'Cancela',
              },
              {
                  text: 'Excluí',
                  handler: () => {
                      this.produtosProvider.deleteOne(id)
                          .then( (result: any) => {
                              this.toast.create({
                                  message: 'Produto excluído com sucesso.',
                                  duration: 3000,
                                  position: 'bottom'}).present();
                          })
                          .catch( () => {
                              this.toast.create({
                                  message: 'Erro na tentativa de excluir o produto.',
                                  duration: 3000,
                                  position: 'bottom'}).present();
                          });
                  }
              }]
      });

      confirma.present();
  }

  private saveProduto() {
      if (this.model.id) {
          return this.produtosProvider.update(this.model);
      }
      else {
          return this.produtosProvider.create(this.model);
      }
  }
}
