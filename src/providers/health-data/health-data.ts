import { Injectable } from '@angular/core';
import { Health } from '@ionic-native/health';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../firebase-db/firebase-db";

@Injectable()
export class HealthDataProvider {


  currentHeight: string;
  workouts = {};

  constructor(private health: Health, private firabaseData: FirebaseDbProvider) {
    this.requestAuth();
   }

  requestAuth(){
    this.health.isAvailable().then((available:boolean) =>{
      this.health.requestAuthorization([
        'distance', 'activity', 'calories', // leave only what's needed
      ])
      .then(res => console.log(res))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  loadWorkoutData_helper(){
    this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // this will be a parameter
      endDate: new Date(),
      dataType: 'activity',
    }).then(data => {
      this.workouts = data;
    }, err => {
      console.log('No workout: ', err);
      //this.workouts = err;
    });
    return this.workouts;
  }

  // this will load the workout data from GoogleFit or Apple HealthKit
  // return is made in an Workout array
   loadWorkoutData(){
     var workoutsIt = [];
     var results: Workout[] = [];

     // for some reason we need we cannot use directly this.workouts. if there is time, let's take a look to take this out!
     var support = this.loadWorkoutData_helper();

     // convert object to array
     workoutsIt = Object.keys(support).map(function(workoutIndex){
       let workout = support[workoutIndex];
       return workout;
     });

     for(let workout of workoutsIt){
       // let's filter out results we are not interested. ALSO workouts that are too short
       if(workout.value != 'still' && workout.value != 'unknown' && (workout.endDate - workout.startDate > 8 * 60 * 1000)){
         var workout_sup: Workout = {
           activityName: workout.value,
           startDate: workout.startDate.toString(),
           //endDate: workout.endDate,
           duration: (workout.endDate - workout.startDate), // in miliseconds
         }
         if(workout.calories.length > 0){
           workout_sup.calories = workout.calories[0].value;
         }
         if(workout.distance.length > 0){
             workout_sup.distance = workout.distance[0].value;
         }
         results.push(workout_sup);
       }
     }

     this.firabaseData.saveWorkoutArray(results);
     // this will change!!!!
     return results;
   }

   // incomplete, need to implement saving the activity distance if "running or similar"..
   saveWorkout(){
     this.health.store({
       startDate: new Date(new Date().getTime() - 15 * 60 * 1000), // change here!
       endDate: new Date(),
       dataType: 'activity',
       value: 'running',
       sourceName: 'fitChallenge',
       sourceBundleId: 'io.ionic.polimifitchallenge.starter'
     });
   }

  /* ***************************************************************************************************** */
  /* TEST FUNCTIONS; simple, just to test the connection between the app and GoogleFit/ Apple health Kit */

    //test function, delete it later
    saveHeight(height){
      this.health.store({
        startDate: new Date(), // change here!
        endDate: new Date(),
        dataType: "height",
        value: height,
        sourceName: 'fitChallenge',
        sourceBundleId: 'io.ionic.polimifitchallenge.starter'
      });
    }
    // also test function! delete it, not used
    loadHeightData(){

      this.health.query({
        startDate: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), // change here!
        endDate: new Date(), // now
        dataType: 'height'
      }).then(val => {
        this.currentHeight = val[0].value; //it's getting the oldest value, just to test
        console.log('Height: ', val);
      }, err => {
        console.log('No Height: ', err);
      });

      return this.currentHeight;
    }
  /* ***************************************************************************************************** */

}
