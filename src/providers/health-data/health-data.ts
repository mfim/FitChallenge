import { Injectable } from '@angular/core';
import { Health } from '@ionic-native/health';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../firebase-db/firebase-db";

@Injectable()
export class HealthDataProvider {


  currentHeight: string;
  workouts = {};

  constructor(private health: Health, private firabaseData: FirebaseDbProvider) {
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

  loadWorkoutData(){

    this.health.isAvailable().then((available:boolean) => {
      this.health.requestAuthorization([
        'distance', 'activity', 'calories',
      ]).then(_ =>{
        this.firabaseData.getLastLogin().then((date) => {
          this.health.query({
            startDate: date,
            endDate: new Date(),
            dataType: 'activity',
          }).then(support => {
            //this.workouts = data;
            //console.log('data: ', data);
            var results: Workout[] = [];

            let workoutsIt = Object.keys(support).map(function(workoutIndex){
              let workout = support[workoutIndex];
              return workout;
            });
            console.log('workoutsIt', workoutsIt);
            for(let workout of workoutsIt){
              // let's filter out results we are not interested. ALSO workouts that are too short
              if(workout.value != 'still' && workout.value != 'unknown' && (workout.endDate - workout.startDate > 8 * 60 * 1000) && workout.sourceName != 'fitChallenge'){
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
            // upload new data to firebase!
            console.log('uploading... :', results);
            this.firabaseData.saveWorkoutArray(results);

          }, err => {
            console.log('No workout: ', err);
          })
        })
      })
    }, err => {
      console.log("It's coming here.. returning not available! ", err);
    });
  }


   // this should be called when saving a new activity!
   // INCOMPLETE!
   saveWorkout(workout: Workout){

      var start: Date = new Date(workout.startDate);
      var end: Date = new Date(start.getTime() + workout.duration);

   // this should work on Android only, testing is needed
     this.health.store({
       startDate: start,
       endDate: end,
       dataType: 'activity',
       value: workout.activityName,
       sourceName: 'fitChallenge',
       sourceBundleId: 'io.ionic.polimifitchallenge.starter'
     });

     if(workout.distance){
       this.health.store({
         startDate: start,
         endDate: end,
         dataType: 'distance',
         value: workout.distance.toString(),
         sourceName: 'fitChallenge',
         sourceBundleId: 'io.ionic.polimifitchallenge.starter'
      });
    }

    if(workout.calories){
      this.health.store({
        startDate: start,
        endDate: end,
        dataType: 'calories',
        value: workout.calories.toString(),
        sourceName: 'fitChallenge',
        sourceBundleId: 'io.ionic.polimifitchallenge.starter'
     });
   }

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
