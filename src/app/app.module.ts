import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { oneClickApiService } from '../services/oneClickApi.service'

// Pages

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalPage } from '../pages/modal/modal';
import { WelcomePage } from '../pages/welcome/welcome';
import { InfoPage } from '../pages/info/info';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import { FavPage } from '../pages/fav/fav';

// Native components

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ModalPage,
    WelcomePage,
    InfoPage,
    GooglemapPage,
    FavPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ModalPage,
    WelcomePage,
    InfoPage,
    GooglemapPage,
    FavPage,
  ],
  providers: [
    oneClickApiService,
    StatusBar,
    SplashScreen,
    SQLite,
    InAppBrowser,
    SMS,
    CallNumber,
    Toast,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
