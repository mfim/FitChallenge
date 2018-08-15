import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { AngularFireObject  } from "angularfire2/database"; 
import { Workout } from "../../models/workout";
import { Observable } from "rxjs/Observable";
import { Challenge } from '../../models/challenge';
import { User } from '../../models/profile';

@Injectable()
export class FirebaseDbProvider {

  workoutsCollection: AngularFirestoreCollection<Workout>; //Firestore collection
  public workouts: Observable<Workout[]>; // read Collection


  challengesCollection: AngularFirestoreCollection<Challenge>; //Firestore collection
  public challenges: Observable<Challenge[]>; // read Collection


  challengesFriendsCollection: AngularFirestoreCollection<Challenge>; //Firestore collection
  public challengesFriends: Observable<Challenge[]>; // read Collection
  constructor(private authData: AuthProvider, private firestoreDb: AngularFirestore) { }

  saveWorkout(workout: Workout) {
    //const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid());
    //activityRef.child("workouts").push(workout);
    this.firestoreDb.collection(`/userProfile/` + this.authData.getUid() + `/workouts/`).add(workout);
  }

  saveWorkoutArray(workouts: Workout[]) {
    //const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid()+`/workouts/`);
    for (let workout of workouts) {
      this.firestoreDb.collection(`/userProfile/` + this.authData.getUid() + `/workouts/`).add(workout);
      //activityRef.push(workout);
    }
  }

  // we wanna dislpay the user's workouts when his online and also offline.
  offlineActivityPersistence() {
    this.workoutsCollection = this.firestoreDb.collection(`/userProfile/` + this.authData.getUid() + `/workouts/`);
    this.workouts = this.workoutsCollection.valueChanges();

    this.challengesCollection = this.firestoreDb.collection(`/challenges/` + this.authData.getUid() + `/workouts/`);
    this.challenges = this.challengesCollection.valueChanges();

    //this.challengesFriendsCollection = this.firestoreDb.collection(`/challenges/`+this.authData.getUid()+`/workouts/`);
    //this.challenges = this.challengesCollection.valueChanges();
  }

  //Save a new challenge
  /*saveChallenge(challenge: Challenge){
    this.firestoreDb.collection(`/challenges/`+this.authData.getUid()+`/workouts/`).add(challenge);
  }*/
  saveChallenge(challenge: Challenge) {
    this.firestoreDb.collection(`/challenges/`).add(challenge);
      //.then(function (docRef) {
      //  this.firestoreDb.collection(`/userProfile/` + this.authData.getUid() + `/challenges/`).add(docRef.id);
      //})
  }
  // next function is the persistent tier... and the list

}