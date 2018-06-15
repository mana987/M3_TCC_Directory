import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ModalPage } from '../modal/modal';
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {

  favorite = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private platform:Platform,public modalCtrl: ModalController) {
    this.platform.ready().then(() => {

    })
  }

  ionViewWillEnter() {
    this.getFavorite();
    console.log('ionViewDidLoad FavPage');
  }

  getFavorite() {
    console.log('getFavorisList');
    this.favorite = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM favorite', {})
          .then((data) => {
            console.log(data.rows.length, data.rows.item(0))
            for (let i = 0; i < data.rows.length; i++) {
              this.favorite.push(data.rows.item(i))
            }
          });
      });
  }

  openModal(id) {
    const modal = this.modalCtrl.create(ModalPage, { businessId: id });
    modal.present();
  }
}

