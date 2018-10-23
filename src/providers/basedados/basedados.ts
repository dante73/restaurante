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
            ['CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, descr TEXT, preco FLOAT, imagem TEXT, categoria INTEGER)'],
            ['CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, descr TEXT, preco REAL, imagem TEXT, categoria INTEGER, doDia INTEGER)']])
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
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['X-Salada', 'Suculento hamburguer artezanal de 200mg no pão tostado com uma salada fresca saída da roça.', 3, 'xsalada.png', 1, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['X-Bacon', 'Suculento hamburguer artezanal de 200mg no pão tostado com uma salada fresca saída da roça e uma fatia generosa do melhor bacon defumado.', 15, 'xbacon.png', 1, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['X-Maionese', 'Suculento hamburguer artezanal de 200mg no pão tostado com uma salada fresca saída da roça coberto pela maionese especial da casa.', 19, 'xmaio.png', 1, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Beirute', 'O mais delicioso beirute de São Paulo.', 15, 'beirute.png', 1, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Bauru', 'Pão francês tostado com manteiga e recheado com queijo e o rosbife especial da casa.', 15, 'bauru.png', 1, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Batata Frita', 'Batatinhas fritas crocantes e saborosas.', 3, 'batatafrita.png', 2, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Mandioca Frita', 'Mandioca tostada e deliciosamente crocante.', 15, 'mandiocafrita.png', 2, 1]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Polenta Frita', 'Polenta bem cremosa frita na hora.', 19, 'polentafrita.png', 2, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Bolinho de Bacalhau', 'Deliciosos e crocantes bolinhos de bacalhau.', 15, 'bbacalhau.png', 2, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Frango a Passarinho', 'Coxinhas de frango deliciosamente temperadas e fritas.', 15, 'fpassarinho.png', 2, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Feijoada', 'Completa, com todos os ingredientes separados para que o cliente escolha os de sua preferência.', 9, 'feijoada.png', 3, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Strognoff', 'O mais delicioso creme de strognoff com carnes selecionadas.', 9, 'strognoff.png', 3, 1]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Pucheiro', 'Grão de bico, carnes selecionadas e vegetais frescos colhidos da roça.', 9, 'pucheiro.png', 3, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Macarronada', 'Massa artesanal coberta pelo nosso delicioso molho especial bolonhesa.', 9, 'macarronada.png', 3, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Escondidinho de Carne Seca', 'Delicioso creme de batatas com carne seca selecionada.', 9, 'escondidinho.png', 3, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Pudim de Leite Condensado', 'O mais delicioso pudim da moça.', 9, 'pudim.png', 4, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Pudim de Paçoca', 'Experimente o nosso delicioso pudim de paçoquita.', 9, 'pupacoca.png', 4, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Mousse de Maracujá', 'Delicioso Mousse de Maracujá.', 9, 'mmaracuja.png', 4, 1]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Carré de Nozes', 'Receita da vovó, delicioso doce de nozes.', 9, 'carrenzs.png', 4, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Sorvete com Brownie', 'Delicioso sorvete de creme acompanhado de um brownie quentinho saido do forno.', 9, 'petitg.png', 4]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Coca Cola KS', 'Refrigerante de cola em garrafa tipo KS', 3, 'cocaks.png', 5, 1]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Coca Cola Lata', 'Refrigerante de cola em Lata', 3, 'coca350.png', 5, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Coca Cola 600', 'Refrigerante de cola com 600ml', 5, 'coca600.png', 5, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Coca Cola 2L', 'Refrigerante de cola com 2 Litros', 7, 'coca2l.png', 5, 0]],
                        ['INSERT INTO produto (name, descr, preco, imagem, categoria, dodia) VALUES (?,?,?,?,?,?)', ['Coca Cola 2.5L', 'Refrigerante de cola com 2,5 Litros', 9, 'coca25l.png', 5, 0]]
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
