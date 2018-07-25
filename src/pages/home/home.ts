import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  latitude = 0;
  longitude = 0;


  ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("Current Geo Location being recorded. LAT: " + this.latitude + "LON: " + this.longitude);
    }).catch((error) => {
      console.log('Error getting your current location. Reason: ', error);
    });
  }

}
