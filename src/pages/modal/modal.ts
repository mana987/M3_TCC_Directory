import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
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

  constructor(private navParams: NavParams, private view: ViewController, private platform: Platform, private OCAS: oneClickApiService, private callNumber: CallNumber, private sms: SMS, private iab: InAppBrowser) {
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

  public callBusinessNumber(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  public sendBusinessSMS(SMS) {
    this.sms.send(SMS, 'Hello world!');
  }

  public openWebPage(url) {
    this.iab.create(url, '_blank')
  }

  ionViewWillLoad() {

  }

  closeModal() {
    this.view.dismiss();
  }

}
