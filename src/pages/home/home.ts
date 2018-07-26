import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { interval } from "rxjs/observable/interval";
import { WeatherProvider } from "../../providers/weather/weather";


declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map')  mapElement: ElementRef;
  map: any;
  // data: Observable<any>;
  data: any;
  source = interval(20000);
  coordinates = {
    latitude: 28.022243,
    longitude: -81.732857
  };
  weather = {
    id: 0,
    name: "",
    main: "clear",
    description: "clear",
    icon: "",
    wind: 0
  };

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public api: WeatherProvider) {}

  ionViewCanEnter(){
    this.getGeoLocation();
    this.updateWeatherInfo();
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.getGeoLocation();
    this.updateWeatherInfo();
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

  updateWeatherInfo(){
    console.log("Entered into Weather API Mapping Method");
    //subscribe to weather data
    this.api.getWeatherInfo(this.coordinates.latitude, this.coordinates.longitude)
      .subscribe(data => {
        this.data = data;
        console.log("SUBSCRIBED DATA: " + JSON.stringify(this.data));
      });
    //Map data to the weather model for the front end
    // this.weather.name = this.data.name;
    // this.weather.id = this.data.weather[0].id;
    // this.weather.main = this.data.weather[0].main;
    // this.weather.description = this.data.weather[0].description;
    // this.weather.icon = this.data.weather[0].icon;
    // this.weather.wind = this.data.wind.speed;
    console.log("JSON DATA FROM WEATHER API: " + JSON.stringify(this.data));
    console.log("DATA MAPPED FROM WEATHER API: " + JSON.stringify(this.weather));
  }

}
