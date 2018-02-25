import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { Workout } from "../../models/workout";

@Injectable()
export class FirebaseDbProvider {

  constructor(private authData: AuthProvider) {
  }

  saveWorkout(workout: Workout[]){
    
    const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid());
    activityRef.child("workouts").push(workout);
  }

  saveWorkoutArray(workouts: Workout[]){
    const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid()+`/workouts/`);
    for(let workout of workouts){
      activityRef.push(workout);
    }
  }

  // next function is the persistent tier... and the list

}
