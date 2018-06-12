
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Pluggins
import { Geolocation } from '@ionic-native/geolocation';





declare var google;

@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html'
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public platform: Platform) {
  platform.ready().then (() => {
    this.loadMap();
  });

   }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition()
    
    .then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }
}
