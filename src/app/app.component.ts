import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BasedadosProvider } from '../providers/basedados/basedados';

import { EditcategoriaPage } from '../pages/editcategoria/editcategoria';
import { EditprodutoPage } from '../pages/editproduto/editproduto';

import { ListacategoriaPage } from '../pages/listacategoria/listacategoria';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    // ViewChild serve para instanciar localmente um objeto de controle do sistema
    @ViewChild(Nav) nav: Nav;

    //rootPage:any = HomePage;
    //rootPage:any = EditcategoriaPage;
    rootPage:any = ListacategoriaPage;

    pages: Array<{title: string, component: any}>;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        dbProvider: BasedadosProvider) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();

            dbProvider.createDatabase()
                .then( () => { this.openHomePage(splashScreen); })
                .catch( () => { this.openHomePage(splashScreen); });

        });

        this.pages = [
            { title: "Editar Categorias", component: EditcategoriaPage },
            { title: "Editar Produtos", component: EditprodutoPage },
        ];
    }

    openPage(page: any): void {
        this.nav.push(page.component);
    }

    private openHomePage(splashScreen: SplashScreen) {
        splashScreen.hide();

        //this.rootPage = HomePage;
        //this.rootPage = ListacategoriaPage;
        this.rootPage = ListacategoriaPage;
    }
}
