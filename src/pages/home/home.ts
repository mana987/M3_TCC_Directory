import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';


// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiSkills } from '../models/oneClickApi-skills.model';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { OneClickApiBusinesses } from '../models/oneClickApi-businesses.model'
import { OneClickGlobalApiSkill } from '../models/oneClickAPi-global-skill.model'
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  filter : Array<string>;
  items = [];
  skills: OneClickApiSkills = new OneClickApiSkills();
  businesses: OneClickApiBusinesses = new OneClickApiBusinesses();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();
  postSkills:OneClickGlobalApiSkill = new OneClickGlobalApiSkill();

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService, public modalCtrl: ModalController, public alertCtrl: AlertController,private callNumber: CallNumber) {
    platform.ready()
      .then(() => {

        for (let i = 0; i < 30; i++) {
          this.items.push(this.items.length);
        }

        this.OCAS.getSkills()
          .then(skillsFetched => {
            this.skills = skillsFetched;
            console.log('skills',this.skills);
          });

        this.OCAS.getBusinesses()
          .then(businessesFetched => {
            this.businesses = businessesFetched;
            console.log('businesses', this.businesses);
          });

        this.OCAS.postSkills()
        .then(postSkillsFetched => {
          this.postSkills = postSkillsFetched;
          console.log('businesses', this.postSkills);
        });
      })
  }

  // Open Modal 

  openModal(id) {
    const modal = this.modalCtrl.create(ModalPage, { businessId: id });
    modal.present();
  }

  // Infinite scroll

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.items.length);
        this.OCAS.getBusinesses();
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 25);
  }
}