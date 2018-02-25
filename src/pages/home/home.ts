import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginPage } from "../login/login";
import { HealthDataProvider } from '../../providers/health-data/health-data';
import { Workout } from "../../models/workout";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentHeight: string;
  height: string;
  workouts: Workout[] = [];

  constructor(private healthData: HealthDataProvider, private authData: AuthProvider, private afAuth:AngularFireAuth, private toast: ToastController, public navCtrl: NavController, private modalCtrl: ModalController) {
  }

  // test function
  saveHeight(){
    this.healthData.saveHeight(this.height);
  }
  // still a test, finish implementing
  saveWorkout(){
    this.healthData.saveWorkout();
  }

  loadWorkoutData(){

    // this will change! the query should not be made from here!
    this.workouts = this.healthData.loadWorkoutData();
  }

  newActivity(){
    const newActivity = this.modalCtrl.create("NewActivityPage");
    newActivity.present();
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.authData.setUid(data.uid);
        this.toast.create({
          message: `Welcome to FitChallenge, ${data.email}` ,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: 'could not find auth details!',
          duration: 3000
        }).present();
      }
    });
    // not tested: in order to solve the first request not answering!
    this.workouts = this.healthData.loadWorkoutData();
  }

  // take a better look!
  logout(){
    this.authData.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
