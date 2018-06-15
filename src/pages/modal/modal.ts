import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform, NavController } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Toast } from '@ionic-native/toast';
import { WelcomePage } from '../welcome/welcome';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GooglemapPage } from '../googlemap/googlemap';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  business: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();
  phoneNumber: string;
  SMS: string;
  url: string;
  visible: boolean;
  name: string;
  db: SQLiteObject;
  position = [];
  eventDev: number;
  nameDev: string;
  latitude: number;
  longitude: number;
  logo: string;



  constructor(private navParams: NavParams, private view: ViewController, private platform: Platform, private OCAS: oneClickApiService, private callNumber: CallNumber, private sms: SMS, private iab: InAppBrowser, private toast: Toast, public navCtrl: NavController, private sqlite: SQLite) {
    platform.ready()
      .then(() => {

        let ID = this.navParams.get("businessId");
        this.OCAS.getBusiness(ID)
          .then(businessFetched => {
            this.business = businessFetched;
            console.log('businesses', this.business);
          });

      })
  }

  ionViewWillEnter() {
    this.loadPage();
    this.initDb();
  }

  loadPage() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('this*;eventDev', this.navParams.get("businessId"));
        this.db = db;
        this.db.executeSql('SELECT * FROM favorite WHERE idev = ?', [this.navParams.get("businessId")])
          .then((data) => {
            console.log(JSON.stringify(data), 'maachheee')
            if (data.rows.length == 1) {
              this.visible = true;
            } else {
              this.visible = false;
            }
          })
      })
  }

  initDb() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        let inserts = "INSERT INTO `favorite` (idev, name, statusFav) VALUES (?, ?, 0)";
        this.db.executeSql(inserts, [this.eventDev, this.nameDev])

          .then(() => {
            console.log('insert done')
          })
          .catch((e) => console.log('error', e));
      })
      .catch(e => console.log('yolo error', e));
  }

  // send position to google

  GoGoogle(position) {
    this.navCtrl.push("GooglemapPage", position)
  }

  // Call Phone Number

  public callBusinessNumber(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  // Send SMS

  public sendBusinessSMS(SMS) {
    this.sms.send(SMS, 'Hello world!');
  }

  // Open Page

  public openWebPage(url) {
    this.iab.create(url, '_self')
  }

  destinationMap(lat, lng, logo) {
    console.log(lat, lng);
    this.navCtrl.push(GooglemapPage, { 'lat': lat, 'lng': lng, 'logo': logo });
  }

  // Active Stars

  starFav(event, namePro) {
    console.log(event)
    this.eventDev = event;
    this.nameDev = namePro;
    if (event) {

    } else {

    }
    this.visible = !this.visible;
    this.toastMessage();
    this.initDb();
  }

  // Message toast

  toastMessage() {
    if (this.visible) {
      this.toast.show(`Ajouté aux favoris`, '1000', 'center')
        .subscribe(
          toast => {
            console.log('add fav', toast);
          }
        );
    } else {
      this.toast.show(`Supprimé des favoris`, '1000', 'center')
        .subscribe(
          toast => {
            console.log('supp fav', toast);
          }
        );
    }
  }

  deleteDb(id) {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let deletesql = "DELETE FROM `favoris` WHERE 'idev'=" + id;
        db.executeSql(deletesql, {})

          .then(() => {
            console.log('delete done')
          })
          .catch((e) => console.log('error', e));
      })
      .catch(e => console.log('yolo error', e));
  }
  // Close Modal

  closeModal() {
    this.view.dismiss();
  }
  ionViewWillLoad() {

  }
}
