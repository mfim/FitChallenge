import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";


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

    //to get the timestamps all in the same format
    this.newWorkout.startDate = new Date(this.newWorkout.startDate).toString();

    // this will be changed to hours and mins...
    this.newWorkout.duration = this.newWorkout.duration * 60 * 1000;
    if(this.newWorkout.distance){
      this.newWorkout.distance = this.newWorkout.distance * 1000;
    }

    //this.healthData.saveWorkout(this.newWorkout);
    //add a call to the health plugin
    this.firebaseData.saveWorkout(this.newWorkout);

    this.view.dismiss();
  }

}
