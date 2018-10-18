import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BasedadosProvider } from '../providers/basedados/basedados';

import { EditcategoriaPage } from '../pages/editcategoria/editcategoria';
import { EditprodutoPage } from '../pages/editproduto/editproduto';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    // ViewChild serve para usar variáveis do sistema
    @ViewChild(Nav) nav: Nav;

    //rootPage:any = HomePage;
    rootPage:any = EditcategoriaPage;

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
    }

    private openHomePage(splashScreen: SplashScreen) {
        splashScreen.hide();

        this.rootPage = HomePage;
    }
}
