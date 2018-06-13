import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  
  business: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();

  constructor(private navParams: NavParams, private view: ViewController, private platform: Platform, private OCAS: oneClickApiService, private callNumber: CallNumber) {
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

  // callBusinessNumber(){
  //   this.callNumber.callNumber("18001010101", true)
  // .then(res => console.log('Launched dialer!', res))
  // .catch(err => console.log('Error launching dialer', err));
  // }

  ionViewWillLoad() {

  }

  closeModal() {
    this.view.dismiss();
  }



}
