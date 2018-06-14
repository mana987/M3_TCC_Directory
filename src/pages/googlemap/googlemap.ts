
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Pluggins
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';




declare var google;
var marker;

@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html'
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;

  // results = [];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public platform: Platform) {
    platform.ready().then(() => {
      
    });

  }

  ionViewDidLoad() {
    this.loadMap();
    }
   

  loadMap() {

    this.geolocation.getCurrentPosition()

      .then((resp) => {
        let latLng = new google.maps.LatLng(48.85837009999999, 2.2944813000000295);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          travelMode: google.maps.TravelMode.ROADMAP
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Hello World!'
        });


        // this.map.setCenter(latLng)

      }, (err) => {
        console.log('aucune position trouvé');
      });

  }
  toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}

  // addResultsMarker() {
    //   let marker, i;

    //   for (i = 0; i < this.results.length; i++) {
    //     marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
    //       map: this.map
    //     });

    //     let contentString = "<div>" + "<img src='" +
    //       this.results[i].logo + "'  style = 'display: block; margin-left: auto; margin-right: auto; width: 50%; height: 50%'/>" + '</div>' +
    //       "<hr/><div style = 'text-align: center'><h2>" + this.results[i].name + '</h2></div>';
    //     let infoWindow = new google.maps.InfoWindow({
    //       content: contentString,
    //       maxWidth: 256
    //     });

    //     google.maps.event.addListener(marker, "click", () => {
    //       infoWindow.open(this.map, marker);
    //     });
    //   }    
    // }
    // marker.setMap(map);


    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);