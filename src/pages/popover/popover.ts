import { Component } from '@angular/core';
import { ViewController, App, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';


@Component({
    template: `
      <ion-list>
        <button clear ion-button (click)="navProfile()">My profile</button>  
        <button ion-item (click)="logout()">Logout</button>
      </ion-list>
    `
  })
  export class PopoverPage {
    constructor(public navCtrl: NavController,public viewCtrl: ViewController,private authData: AuthProvider, private afAuth:AngularFireAuth, private app: App) {}

    close() {
      this.viewCtrl.dismiss();
    }
    logout(){
    
      this.authData.logout();
      //this.navCtrl.setRoot("LoginPage");
      this.app.getRootNav().setRoot('LoginPage');
      this.viewCtrl.dismiss();
      
    }
    navProfile(){
      this.navCtrl.push(ProfilePage);
      this.viewCtrl.dismiss();
      
    }
  }