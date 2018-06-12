import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  
  business: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();

  constructor(private navParams: NavParams, private view: ViewController, private platform: Platform, private OCAS: oneClickApiService) {
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

  ionViewWillLoad() {

  }

  closeModal() {
    this.view.dismiss();
  }



}
