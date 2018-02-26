import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { HealthDataProvider } from '../../providers/health-data/health-data';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentHeight: string;
  height: string;
  //workouts: Workout[] = [];

  constructor(private healthData: HealthDataProvider, private authData: AuthProvider, private afAuth:AngularFireAuth, private toast: ToastController, public navCtrl: NavController, private modalCtrl: ModalController, private firabaseData: FirebaseDbProvider) {
  }

  // test function
  saveHeight(){
    this.healthData.saveHeight(this.height);
  }
/*
  loadWorkoutData(){
    this.healthData.loadWorkoutData();
  }*/

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
  }

  ionViewDidLoad(){
    this.healthData.loadWorkoutData();
  }

  ionViewWillEnter(){
    this.firabaseData.offlineActivityPersistence();
  }

  ngOnInit(){
    // not working.....
    //this.healthData.loadWorkoutData();
  }

  // take a better look! this will not stay here
  logout(){
    this.authData.logout();
    this.navCtrl.setRoot("LoginPage");
  }

}
