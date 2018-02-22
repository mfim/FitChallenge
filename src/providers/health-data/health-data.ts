import { Injectable } from '@angular/core';
import { Health } from '@ionic-native/health';

@Injectable()
export class HealthDataProvider {

  constructor(private health: Health) {
    this.requestAuth();
   }

  requestAuth(){
    this.health.isAvailable().then((available:boolean) =>{
      this.health.requestAuthorization([
        'distance', 'activity', 'calories'
      ])
      .then(res => console.log(res))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  saveWorkout(){
    let  workout = {
      'dataType': 'activity',
      'startDate': new Date(new Date().getTime() - 3 *60 *1000), //three minutes ago
      'endDate': new Date(),
      'value': 'running',
      'sourceName': 'FitChallenge',
      'sourceBundleId': 'com.example.fitChallenge',
      'distance': 50
    }
    this.health.store(workout);
  }

  leadHealthData(){

  }



}
