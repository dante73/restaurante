import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
    imagens: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private alertCtrl: AlertController,
        private categoriasProvider: CategoriasProvider) {

        this.imagens = [
            'bebidas.png',
            'entradas.png',
            'gelados.png',
            'lanches.png',
            'refeicoes.png',
            'sobremesas.png'
        ];

        this.model = new Categoria();

        if (this.navParams.data.id) {

            this.categoriasProvider.read(this.navParams.data.id)
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
                    message: 'Erro ao carregar as categorias.',
                    duration: 3000,
                    position: 'bottom'}).present();
            });
    }

    save() {
        this.saveCategoria()
            .then( () => {
                this.toast.create({
                    message: 'Dados gravados com sucesso.',
                    duration: 3000,
                    position: 'bottom'})
                    .present();
                this.categoriasProvider.getAll()
                    .then( (result: any[]) => {
                        this.categorias = result;
                        //this.navCtrl.pop();
                    })
                    .catch( () => {
                        this.toast.create({
                            message: 'Erro ao carregar as categorias.',
                            duration: 3000,
                            position: 'bottom'}).present();
                    });
                })
            .catch( () => {
                    this.toast.create({
                        message: 'Erro ao salvar a categoria.',
                        duration: 3000,
                        position: 'bottom'})
                        .present();
                });
    }

    open(id) {
        this.categoriasProvider.read(id).then( (result: any) => { this.model = result; });
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
                        this.categoriasProvider.deleteOne(id)
                            .then( (result: any) => {
                                this.toast.create({
                                    message: 'Categoria excluída com sucesso.',
                                    duration: 3000,
                                    position: 'bottom'}).present();
                            })
                            .catch( () => {
                                this.toast.create({
                                    message: 'Erro na tentativa de excluir a categoria.',
                                    duration: 3000,
                                    position: 'bottom'}).present();
                            });
                    }
                }
            ]
        });

        confirma.present();
    }

    private saveCategoria() {
        if (this.model.id) {
            return this.categoriasProvider.update(this.model);
        }
        else {
            return this.categoriasProvider.create(this.model);
        }
    }
}
