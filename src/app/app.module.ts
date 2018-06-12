import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages

import { FavPage } from '../pages/fav/fav';
import { GoogleMapPage } from '../pages/googlemap/googlemap';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InfoPage } from './../pages/info/info';
import { WelcomePage } from './../pages/welcome/welcome';

// Native components

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from "@ionic-native/geolocation";

@NgModule({
  declarations: [
    MyApp,
    FavPage,
    GoogleMapPage,
    HomePage,
    TabsPage,
    InfoPage,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavPage,
    GoogleMapPage,
    HomePage,
    TabsPage,
    InfoPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    InAppBrowser,
    SMS,
    CallNumber,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
