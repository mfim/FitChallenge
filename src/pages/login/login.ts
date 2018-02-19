import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from "../../models/user";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { ResetPasswordPage } from "../reset-password/reset-password";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loading:Loading;
  user = {} as User;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
      this.authData.login(this.user).then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({

          message: error.message,
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

  googleLogin(){
    this.authData.googleLogin().then( authData => {
      this.navCtrl.setRoot(HomePage);
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({

          message: error.message,
          buttons:
          [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
  }

  facebookLogin(){
    this.authData.facebookLogin().then( authData => {
      this.navCtrl.setRoot(HomePage);
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({

          message: error.message,
          buttons:
          [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
  }


}
