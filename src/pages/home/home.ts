import { Component } from '@angular/core';
import { NavController, Platform, AlertController, NavParams } from 'ionic-angular';
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

  filter: Array<string>;
  items = [];
  skills: OneClickApiSkills = new OneClickApiSkills();
  globalBusiness: OneClickApiGlobalBusiness = new OneClickApiGlobalBusiness();
  postSkills: OneClickGlobalApiSkill = new OneClickGlobalApiSkill();
  data: any;
  businesses: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public navCtrl: NavController, private platform: Platform, private OCAS: oneClickApiService, public modalCtrl: ModalController, public alertCtrl: AlertController, private callNumber: CallNumber, private navParams: NavParams) {
    platform.ready()
      .then(() => {
        this.getBusinesses();
        this.OCAS.getSkills()
          .then(skillsFetched => {
            this.skills = skillsFetched;
            console.log('skills', this.skills);
          });
      })
  }

  // Get All Businesses 

  getBusinesses() {
    this.OCAS.getBusinesses(this.page)
      .subscribe(
        res => {
          this.data = res;
          // console.log("HomePage/data", res);
          this.businesses = this.data.data;
          // console.log("HomePage/businesses", this.data.data);
          this.perPage = this.data.per_page;
          console.log("HomePage/perPage", this.data.per_page);
          this.totalData = this.data.total;
          console.log("HomePage/totalData", this.data.total);
          this.totalPage = this.data.last_page;
          console.log("HomePage/totalPage", this.data.last_page);
        },
        error => this.errorMessage = <any>error);
  }

  // Inifinite scroll

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.OCAS.getBusinesses(this.page)
        .subscribe(
          res => {
            this.data = res;
            // console.log("HomePage/data", res);
            this.perPage = this.data.per_page;
            // console.log("HomePage/perPage", this.data.per_page);
            this.totalData = this.data.total;
            console.log("HomePage/totalData", this.data.total);
            this.totalPage = this.data.last_page;
            console.log("HomePage/totalPage", this.data.last_page);
            for (let i = 0; i < this.data.data.length; i++) {
              this.businesses.push(this.data.data[i]);
            }
          },
          error => this.errorMessage = <any>error);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  // Open Modal 

  openModal(id) {
    const modal = this.modalCtrl.create(ModalPage, { businessId: id });
    modal.present();
  }

  // Select Value from Skills

  showSelectValue(value) {
    console.info("Selected:", value);

  }
}