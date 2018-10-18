import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CategoriaPage } from '../pages/categoria/categoria';
import { ProdutoPage } from '../pages/produto/produto';

//    Curiosamente "EditCategoriaPage" e "EditProdutoPage" (CamelStyle)
// não funcionam e geram o erro :
//
// Error: Unexpected value 'undefined' declared by the module 'AppModule'
//
import { EditcategoriaPage } from '../pages/editcategoria/editcategoria';
import { EditprodutoPage } from '../pages/editproduto/editproduto';

import { SQLite } from '@ionic-native/sqlite';
import { BasedadosProvider } from '../providers/basedados/basedados';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { ProdutosProvider } from '../providers/produtos/produtos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriaPage,
    ProdutoPage,
    EditcategoriaPage,
    EditprodutoPage   
  ],                  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriaPage,
    ProdutoPage,
    EditcategoriaPage,
    EditprodutoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    BasedadosProvider,
    CategoriasProvider,
    ProdutosProvider
  ]
})
export class AppModule {}
