import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiSkills } from '../models/oneClickApi-skills.model';
import { OneClickApiGlobalBusiness} from '../models/oneClickApi-global-business.model';
import { OneClickApiBusinesses } from '../models/oneClickApi-businesses.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  skills: OneClickApiSkills;
  businesses: OneClickApiBusinesses = new OneClickApiBusinesses();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService) {
    platform.ready()
    .then(() => {
      this.OCAS.getSkills()
        .then(skillsFetched => {
          this.skills = skillsFetched;
          console.log('skills',this.skills);
        });

        // this.OCAS.getGlobalBusiness()
        // .then(globalBusinessFetched => {
        //   this.globalBusiness = globalBusinessFetched;
        //   console.log('businesses',this.globalBusiness);
        // });

        this.OCAS.getBusinesses()
        .then(businessesFetched => {
          this.businesses = businessesFetched;
          console.log('businesses',this.businesses);
        });
    })
  }
}
