import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BasedadosProvider } from '../../providers/basedados/basedados';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {

  constructor(
      private dbProvider: BasedadosProvider
  ) { }

  // CRUD for "Categoria"

  public create(categoria: Categoria) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "INSERT INTO categoria (name, descr, imagem) VALUES (?,?,?)";
              let data = [
                  categoria.name,
                  categoria.descr,
                  categoria.imagem
              ];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public read(id: number) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "SELECT * FROM categoria WHERE id = ?";
              let data = [id];

              return db.executeSql(sqlcmd, data)
                  .then( (data: any) => {
                      if (data.rows.length > 0) {
                          let item = data.rows.item(0);
                          let categoria = new Categoria();
                          categoria.id = item.id;
                          categoria.name = item.name;
                          categoria.descr = item.descr;
                          categoria.imagem = item.imagem;
                          return categoria;
                      }
                      return null;
                  })
                  .catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public update(categoria: Categoria) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "UPDATE categoria SET name = ?, descr = ?, imagem = ? WHERE id = ?";
              let data = [
                  categoria.name,
                  categoria.descr,
                  categoria.imagem,
                  categoria.id
              ];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  public deleteOne(id: number) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = "DELETE FROM categoria WHERE id = ?";
              let data = [id];

              return db.executeSql(sqlcmd, data).catch( (e) => console.error(e) );
          })
          .catch( (e) => console.error(e) );
  }

  // Another methods
  public getAll(name: string = null) {
      return this.dbProvider.getDb()
          .then( (db: SQLiteObject) => {

              let sqlcmd = 'SELECT * FROM categoria ORDER BY name';
              let data = [];

              if (name) {
                  sqlcmd += ' WHERE p.name like ?';
                  data.push('%'+name+'%');
              }

              return db.executeSql(sqlcmd, data)
                  .then( (data: any) => {
                      if (data.rows.length > 0) {

                          let categorias: any[] = [];
                          for (var i = 0; i < data.rows.length; i++) {
                              var categoria = data.rows.item(i);
                              categorias.push(categoria);
                          }
                          return categorias;
                      }
                      else {
                          return [];
                      }
                  })
                  .catch( (e) => console.error(e) );
            })
          .catch( (e) => console.error(e) );
  }
}

export class Categoria {
    id: number;
    name: string;
    descr: string;
    imagem: string;
}
