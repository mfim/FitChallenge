import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private authData: AuthProvider, private afAuth:AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
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

  // take a better look!
  logout(){
    this.authData.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
