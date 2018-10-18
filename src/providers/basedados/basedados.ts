import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the BasedadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
 */
@Injectable()
export class BasedadosProvider {

    constructor(
        private sqlite: SQLite,
        private toast: ToastController) {
    }

    public getDb() {

        return this.sqlite.create({ name: 'restaurante.db', location: 'default' });
    }

    public createDatabase() {

        return this.getDb()
            .then( (db: SQLiteObject) => { this.createTables(db); })
            .catch( (e) => {
                this.toast.create({
                    message: 'Problemas para criar a base de dados.',
                    duration: 3000,
                    position: 'bottom'}).present();
            });
    }

    private createTables(db: SQLiteObject) {
        db.sqlBatch([
            ['CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, descr TEXT, imagem TEXT)'],
            ['CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, descr TEXT, imagem TEXT)']])
            .then( () => { this.insertDefaultData(db); })
            .catch( (e) => {
                this.toast.create({ message: 'Problema na criação das Coleções', duration: 3000, position: 'bottom'}).present();
            });
    }

    private insertDefaultData(db: SQLiteObject) {
        db.executeSql('SELECT COUNT(*) AS qtd FROM categoria', [])
            .then( (data: any) => {
                if (data.rows.item(0).qtd == 0) {
                    db.sqlBatch([
                        ['INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)', ['Lanches', 'Lanches deliciosos feitos com produtos de qualidade.', 'lanches.png']],
                        ['INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)', ['Pratos de Entrada', 'Pratos simples para matar a fome antes da refeição.', 'entradas.png']],
                        ['INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)', ['Refeições', 'Refeições completas .', 'refeicoes.png']],
                        ['INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)', ['Sobremesas', 'Doces deliciosos para fechar sua refeição com chave de ouro.', 'sobremesas.png']],
                        ['INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)', ['Bebidas', 'Sucos naturais, refrigerante e água. Não vendemos bebidas alcoólicas.', 'bebidas.png']],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['X-Salada', 'Suculento hamburguer artezanal de 200mg no pão tostado com uma salada fresca saída da roça.', 1]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Beirute', 'O mais delicioso beirute de São Paulo.', 1]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Feijoada', 'Completa, com todos os ingredientes separados para que o cliente escolha os de sua preferência.', 3]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Pudim de Leite Condensado', 'O mais delicioso pudim da moça.', 4]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Coca Cola', 'Lata', 5]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Coca Cola', '600ml', 5]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Coca Cola', '2 Litros', 5]],
                        ['INSERT INTO produto (name, descr, imagem) VALUES (?,?,?)', ['Coca Cola', '2,5 Litros', 5]]
                    ])
                        .then( () => {
                            console.log('Dados iniciais cadastrados com sucesso')
                            this.toast.create({ message: 'Dados criados.', duration: 3000, position: 'bottom'}).present();
                        })
                        .catch( (e) => {
                            this.toast.create({ message: 'Problemas na criação dos dados.', duration: 3000, position: 'bottom'}).present();
                            console.log(e);
                        });
                }
            })
            .catch( (e) => {
                console.log(e);
                this.toast.create({ message: 'Problemas na leitura dos dados.', duration: 3000, position: 'bottom'}).present();
            });
    }
}
