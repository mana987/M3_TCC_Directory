import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// PAGES
import { TabsPage } from './../tabs/tabs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  database: SQLiteObject;
  progress = 0;



  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private sqlite:SQLite) {
    this.platform.ready().then(() => {
      this.redirectToTabs();
      this.navParams.get('event');
    })
  }

  initDb() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createFavoriteTable();
        // this.dropOeuvresTable();
      })
      .catch(e => console.log(e));
  }

  // Create Table

  createFavoriteTable() {

    this.database.executeSql('CREATE TABLE IF NOT EXISTS favorite (id INTEGER PRIMARY KEY, name TEXT, fav INTEGER )', {})
      .then(() => {
        this.checkFavoriteExists()
          .then((data) => {
            // let totalOeuvres = data;
            // console.log('total oeuvres', data);
            // if (totalOeuvres == 21) this.redirectToTabs();
            // else this.insertOeuvresDatas();
          })
      })
      .catch(e => console.log(e));

  }

  // Drop Table
  
  // dropFavoriteTable(): any {
  //   this.database.executeSql('DROP TABLE Favorite', {})
  //     .then(() => {
  //       console.log('table oeuvres dropped')
  //     })
  //     .catch(() => {

  //     })
  // }

  checkFavoriteExists(): any {

    return this.database.executeSql('SELECT * FROM favorite', {})
      .then((data) => {
        return data.rows.length;
      })
      .catch(e => console.log(e));
  }

  insertFavoriteDatas() {

    let inserts ="INSERT INTO `favorite` VALUES ('event')";
    this.database.executeSql(inserts, {})
      .then(() => {
        this.redirectToTabs()
      })
      .catch((e) => console.log('error', e));
  }

  redirectToTabs() {
    let limit = 4;
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