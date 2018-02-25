import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Workout } from "../../models/workout";
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

/**
 * Generated class for the NewActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivityPage {

  newWorkout: Workout[] = [];

  constructor(private view: ViewController, private authData: AuthProvider) {
  }

  cancelNewActivity(){
    this.view.dismiss();
  }

  saveNewActivity(): void {
    const activityRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.authData.getUid());

    activityRef.child("workouts").push(this.newWorkout);
    this.view.dismiss();
  }

}
