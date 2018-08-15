import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, ModalController, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { HealthDataProvider } from '../../providers/health-data/health-data';
import { Workout } from "../../models/workout";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { TabsPage } from '../tabs/tabs';
import { ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentHeight: string;
  height: string;
  //workouts: Workout[] = [];



  constructor(public popoverCtrl: PopoverController,private healthData: HealthDataProvider, private authData: AuthProvider, private afAuth:AngularFireAuth, private toast: ToastController, public navCtrl: NavController, private modalCtrl: ModalController, private firabaseData: FirebaseDbProvider, private app: App) {
  }

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

  // swipe
  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
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
  /*
    var worker = new Worker( '../../providers/health-data/health-data.ts');
    worker.postMessage({
      'cmd': 'loadWorkoutData',
    });
*/
    this.healthData.loadWorkoutData();
  }

  ionViewWillEnter(){
    this.firabaseData.offlineActivityPersistence();
    //this.navCtrl.setRoot(TabsPage);

  }
  ionViewDidEnter (){
    //this.navCtrl.setRoot('TabsPage');
  }
  // take a better look!
  logout(){

    this.authData.logout();
    //this.navCtrl.setRoot("LoginPage");
    this.app.getRootNav().setRoot('LoginPage');

  }

}
