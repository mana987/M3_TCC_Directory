import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// PAGES
import { TabsPage } from './../tabs/tabs';



@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  progress: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.platform.ready().then(() => {
      this.redirectToTabs();
    })
  }

  redirectToTabs() {
    let limit = 10;
    let counter = 0;
    this.progress = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('count', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(TabsPage)
      }
    }, 1000);
  }

}
