import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { interval } from "rxjs/observable/interval";


declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map')  mapElement: ElementRef;
  map: any;
  source = interval(200000);
  coordinates = {
    latitude: 0,
    longitude: 0
  };



  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
  }

  ionViewCanEnter(){
    this.getGeoLocation();
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.getGeoLocation();
    let markerLocation = {lat: this.coordinates.latitude, lng: this.coordinates.longitude};
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 18,
      center: {lat: this.coordinates.latitude, lng: this.coordinates.longitude}
    });
    let marker = new google.maps.Marker({position: markerLocation, map: this.map, visibility: true});
    marker.setMap(this.map);
  }

  //Perform a check on location every two minutes
  subscribe = this.source.subscribe(val => this.initMap());

  getGeoLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coordinates.latitude = resp.coords.latitude;
      this.coordinates.longitude = resp.coords.longitude;
      console.log("Current Geo Location being recorded. LAT: " + this.coordinates.latitude + "LON: " + this.coordinates.longitude);
    }).catch((error) => {
      console.log('Error getting your current location. Reason: ', error);
    });
  }

}
