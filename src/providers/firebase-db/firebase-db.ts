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
    this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`).doc(workout.startDate).set(workout);
  }

  saveWorkoutArray(workouts: Workout[]){
    //const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid()+`/workouts/`);

    for(let workout of workouts){
      this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`).doc(workout.startDate).set(workout);
      //activityRef.push(workout);
    }

    // we know that the previous data has been persisted in the DB, let's update the login time
    this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/logins/`).doc(`last_login`).set({
      date: new Date()
    });

  }
  // we wanna dislpay the user's workouts when his online and also offline.
  offlineActivityPersistence(){

    this.workoutsCollection = this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/workouts/`);
    this.workouts = this.workoutsCollection.valueChanges();
  }

  getLastLogin(): Promise <Date> {
    var loginsRef = this.firestoreDb.collection(`/userProfile/`+this.authData.getUid()+`/logins/`).doc(`last_login`);
    return loginsRef.ref.get().then(function(doc) {
      if(doc.exists) {
        console.log()
        return new Date(doc.data().date - 7 * 24 * 60 * 60 * 1000); // let's check seven days before the last
      } else{
        return new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000); // we load data from the last month
      }
    });
  }
}


// REMOVE ANGULARFIRE2-OFFLIN"!!!!!!
