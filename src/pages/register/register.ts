import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from "../../models/user";
import { HomePage} from '../home/home';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public loading: Loading;
  user = {} as User;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  register(user){
    this.authData.register(user).then(() => {
      // change this later!!! to wait confirmation mail
      this.navCtrl.setRoot(HomePage);
    }, (error) => {
      this.loading.dismiss().then (() => {
        var errorMessage: string = error.message;
        let alert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
}
