import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BasedadosProvider } from '../../providers/basedados/basedados';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {

  constructor(
      private toast: ToastController,
      private dbProvider: BasedadosProvider
  ) { }

  // CRUD for "Produto"

  public create(produto: Produto) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "INSERT INTO produto (name, descr, preco, imagem, categoria) VALUES (?,?,?,?,?)";
              let data = [
                  produto.name,
                  produto.descr,
                  produto.preco,
                  produto.imagem,
                  produto.categoria
              ];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public read(id: number) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "SELECT * FROM produto WHERE id = ?";
              let data = [id];

              return db.executeSql(sqlcmd, data)
                  .then( (data: any) => {
                      if (data.rows.length > 0) {
                          let item = data.rows.item(0);
                          let produto = new Produto();
                          produto.id = item.id;
                          produto.name = item.name;
                          produto.descr = item.descr;
                          produto.preco = item.preco;
                          produto.imagem = item.imagem;
                          produto.categoria = item.categoria;
                          return produto;
                      }
                      return null;
                  })
                  .catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public update(produto: Produto) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "UPDATE produto SET name = ?, descr = ?, preco = ?, imagem = ?, categoria = ? WHERE id = ?";
              let data = [
                  produto.name,
                  produto.descr,
                  produto.preco,
                  produto.imagem,
                  produto.categoria,
                  produto.id
              ];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public deleteOne(id: number) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "DELETE FROM produto WHERE id = ?";
              let data = [id];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  // Another methods
  public getAll(name: string = null, categoria: number = null, dodia: number = null) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = 'SELECT p.*, c.name AS categoria_name FROM produto p LEFT JOIN categoria c USING(id)';
              let data = [];

              if (name) {
                  sqlcmd += ' WHERE p.name LIKE ?';
                  data.push('%'+name+'%');
              }

              if (categoria) {
                  sqlcmd += !name ? ' WHERE ' : ' AND '; 
                  sqlcmd += 'p.categoria = ?';
                  data.push(categoria);
              }

              if (dodia) {
                  sqlcmd += !name && !categoria ? ' WHERE ' : ' AND '; 
                  sqlcmd += 'p.doDia = ?';
                  data.push(dodia);
              }

              sqlcmd += ' ORDER BY p.name';

              return db.executeSql(sqlcmd, data)
                  .then( (data: any) => {
                      if (data.rows.length > 0) {

                          let produtos: any[] = [];
                          for (var i = 0; i < data.rows.length; i++) {
                              var produto = data.rows.item(i);
                              produtos.push(produto);
                          }
                          return produtos;
                      }
                      else {
                          return [];
                      }
                  })
                  .catch( (e) => {
                      console.error(e)
                      this.toast.create({
                          message: sqlcmd,
                          duration: 30000,
                          position: 'bottom'}).present();
                  });
            })
          .catch( (e) => {
              console.error(e);
          });
  }
}

export class Produto {
    id: number;
    name: string;
    preco: number;
    descr: string;
    imagem: string;
    categoria: number;
}
