import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';


// API

import { oneClickApiService } from '../../services/oneClickApi.service';
import { OneClickApiSkills } from '../models/oneClickApi-skills.model';
import { OneClickApiGlobalBusiness } from '../models/oneClickApi-global-business.model';
import { OneClickApiBusinesses } from '../models/oneClickApi-businesses.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  testCheckboxOpen: boolean;
  testCheckboxResult;
  items = [];
  skills: OneClickApiSkills;
  businesses: OneClickApiBusinesses = new OneClickApiBusinesses();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    platform.ready()
      .then(() => {

        for (let i = 0; i < 30; i++) {
          this.items.push(this.items.length);
        }

        // this.OCAS.getSkills()
        //   .then(skillsFetched => {
        //     this.skills = skillsFetched;
        //     console.log('skills',this.skills);
        //   });

        this.OCAS.getBusinesses()
          .then(businessesFetched => {
            this.businesses = businessesFetched;
            console.log('businesses', this.businesses);
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

  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sélection des compétences');
    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }


}