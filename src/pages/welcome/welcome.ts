import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  progress = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    platform.ready().then(() => {
      // this.redirectToTabs();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  // redirectToTabs() {
  //   let limit = 5;
  //   let counter = 0;
  //   let myInterval = setInterval(() => {
  //     counter++;
  //     console.log('count', counter);
  //     this.progress = counter * 100 / limit;
  //     console.log('progress', this.progress);
  //     if (counter == limit) {
  //       clearInterval(myInterval);
  //       this.navCtrl.push(TabsPage);
  //     }
  //   }, 1000);
  // }
  

}
