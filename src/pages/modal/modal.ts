import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiSkills } from '../models/oneClickApi-skills.model';
import { OneClickApiGlobalBusiness} from '../models/oneClickApi-global-business.model';
import { OneClickApiBusinesses } from '../models/oneClickApi-businesses.model'

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  skills: OneClickApiSkills;
  businesses: OneClickApiBusinesses = new OneClickApiBusinesses();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();
  
  constructor(private navParams: NavParams, private view:ViewController, private platform: Platform, private OCAS: oneClickApiService) {
    platform.ready()
    .then(() => {

      this.OCAS.getSkills()
        .then(skillsFetched => {
          this.skills = skillsFetched;
          console.log('skills',this.skills);
        });

        this.OCAS.getBusinesses()
        .then(businessesFetched => {
          this.businesses = businessesFetched;
          console.log('businesses',this.businesses);
        });
    })
  }

  ionViewWillLoad() {

  }

  closeModal (){
    this.view.dismiss();
  }



}
