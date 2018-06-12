import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';


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

  items = [];
  skills: OneClickApiSkills;
  businesses: OneClickApiBusinesses = new OneClickApiBusinesses();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService,public modalCtrl: ModalController) {
    platform.ready()
    .then(() => {
      
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

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

  openModal() {
    const modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
        this.OCAS.getBusinesses();
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 25);
  }

}
