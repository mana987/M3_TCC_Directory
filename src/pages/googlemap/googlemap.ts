
import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;


@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html'
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.loadMap();
  }
  loadMap() {
    let latLng = new google.maps.LatLng(-17.573051, -149.609096)
    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}


