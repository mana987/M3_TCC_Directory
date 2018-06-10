import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiSkills } from '../models/oneClickApi-skills.model';
import { OneClickApiBusinesses } from '../models/oneClickApi-businesses.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  skills: OneClickApiSkills;
  businesses: OneClickApiBusinesses;

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService) {
    platform.ready().then(() => {
      this.OCAS.getSkills()
        .then(skillsFetched => {
          this.skills = skillsFetched;
          console.log(this.skills);
        });

        this.OCAS.getBusinesses()
        .then(businessesFetched => {
          this.businesses = businessesFetched;
          console.log(this.businesses);
        });
    })
  }
}
