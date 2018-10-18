import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  dadosPadraoCategoria: Array<{name: string, descr: string, imagem: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.dadosPadraoCategoria = [
        {   name: 'Lanches',
            descr: 'Lanches deliciosos feitos com produtos de qualidade.',
            imagem: 'lanches.png'},
        {   name: 'Pratos de Entrada',
            descr: 'Pratos simples para matar a fome antes da refeição.',
            imagem: 'entradas.png'},
        {   name: 'Refeições',
            descr: 'Refeições completas .',
            imagem: 'refeicoes.png'},
        {   name: 'Sobremesas',
            descr: 'Doces deliciosos para fechar sua refeição com chave de ouro.',
            imagem: 'sobremesas.png'},
        {   name: 'Bebidas',
            descr: 'Sucos naturais, refrigerante e água. Não vendemos bebidas alcoólicas.',
            imagem: 'bebidas.png'}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

}
