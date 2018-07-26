import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  constructor(public http: HttpClient) {
    console.log('Weather Provider has been loaded properly');
  }

  getWeatherInfo(lat: any, lon: any){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=87a9a58a1ec9534aa265f9efa83d839b');
  }

}
