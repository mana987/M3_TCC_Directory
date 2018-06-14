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
  db: SQLiteObject;

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

  // Active Stars

  starFav(event) {
    console.log(event)
    this.navCtrl.push(WelcomePage, event)
    this.visible = !this.visible;
    this.toastMessage();
  }

  // Message toast

  toastMessage() {
    if (this.visible) {
      this.toast.show(`Ajouté aux favoris`, '1000', 'center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
    } else {
      this.toast.show(`Supprimé des favoris`, '1000', 'center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
    }
  }

  // Update Status favorite

  // upDateStatus() {

  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('UPDATE favorite SET fav = 1 WHERE code =' event, {})
  //         .then((data) => {          
  //           if(){
  // 
  // }else{

  // }
  //         });
  //     });
  // }

  // Close Modal

  closeModal() {
    this.view.dismiss();
  }
  ionViewWillLoad() {

  }



}
