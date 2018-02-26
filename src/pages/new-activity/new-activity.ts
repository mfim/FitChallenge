import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";

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

  newWorkout = {} as Workout ;

  constructor(private view: ViewController, private firebaseData: FirebaseDbProvider) {
  }

  cancelNewActivity(){
    this.view.dismiss();
  }

  saveNewActivity(): void {

    // this will be changed to hours and mins...
    this.newWorkout.duration = this.newWorkout.duration * 60 * 1000;
    this.newWorkout.distance = this.newWorkout.distance * 1000;

    //add a call to the health plugin
    this.firebaseData.saveWorkout(this.newWorkout);

    this.view.dismiss();
  }

}
