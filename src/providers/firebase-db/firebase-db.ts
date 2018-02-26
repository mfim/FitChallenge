import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Workout } from "../../models/workout";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FirebaseDbProvider {

  workoutsCollection: AngularFirestoreCollection<Workout>; //Firestore collection
  public workouts: Observable<Workout[]>; // read Collection


  constructor(private authData: AuthProvider, private firestoreDb: AngularFirestore) {
    
  }

  saveWorkout(workout: Workout){

    //const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid());
    //activityRef.child("workouts").push(workout);
    this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`).add(workout);
  }

  saveWorkoutArray(workouts: Workout[]){
    //const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid()+`/workouts/`);

    for(let workout of workouts){
      this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`).add(workout);
      //activityRef.push(workout);
    }
  }

  // we wanna dislpay the user's workouts when his online and also offline.
  offlineActivityPersistence(){

    this.workoutsCollection = this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`);
    this.workouts = this.workoutsCollection.valueChanges();
  }

  // next function is the persistent tier... and the list

}


// REMOVE ANGULARFIRE2-OFFLIN"!!!!!!
