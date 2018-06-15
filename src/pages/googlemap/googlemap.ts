import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

// Pluggins
import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';




declare var google;
var marker;

@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html'
})
export class GooglemapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  lat: number;
  lng: number;
  logo: string;
  results = [];


  constructor(public navCtrl: NavController, private geolocation: Geolocation, public platform: Platform, private navParams: NavParams) {
    platform.ready().then(() => {
      this.lat = this.navParams.get('lat');
      this.lng = this.navParams.get('lng');
      this.logo = this.navParams.get('logo')
    });

  }


  ionViewDidLoad() {
    this.loadMap();
    this.initDirections(this.lat,this.lng);
  }





  loadMap() {

    let latLng = new google.maps.LatLng(48.85837009999999, 2.2944813000000295);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      travelMode: google.maps.TravelMode.ROADMAP
    }
     this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!'
    });
  }

  initDirections(lat,lng){
    var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = this.map;
        let destinationLatLng = new google.maps.LatLng(lat, lng);

        directionsDisplay.setMap(map);
        console.log('test initDirections');

        this.calculateAndDisplayRoute(directionsService, directionsDisplay, destinationLatLng);
  }
  
  calculateAndDisplayRoute(directionsService, directionsDisplay, destinationLatLng) {
    console.log('caculate')
    let latLng = new google.maps.LatLng(
        48.8584,
        2.2945);
    directionsService.route({
        origin: latLng,
        destination: destinationLatLng,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
        directionsDisplay.setDirections(response);
        } else {
          console.log('else')
        window.alert('Directions request failed due to ' + status);
        }
    });
}

  toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  // Current position from cellphone

  // loadMap() {

  //   this.geolocation.getCurrentPosition()

  //     .then((resp) => {
  //       let latLng = new google.maps.LatLng(res.coords.latitude, res.coords.latitude);
  //       let mapOptions = {
  //         center: latLng,
  //         zoom: 15,
  //         travelMode: google.maps.TravelMode.ROADMAP
  //       }
  //       let map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //       let marker = new google.maps.Marker({
  //         position: latLng,
  //         map: map,
  //         animation: google.maps.Animation.DROP,
  //         title: 'Hello World!'
  //       });

  //     }, (err) => {
  //       console.log('aucune position trouvé');
  //     });

  // }
}
