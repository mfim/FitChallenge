import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from "../../models/profile";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";
import { ResetPasswordPage } from "../reset-password/reset-password";
import { MyGroupsPage } from '../my-groups/my-groups';
import { DataService } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  hideMe=false;

  public loading:Loading;
  user = {} as User;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private data : DataService) {
  }
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
      this.authData.login(this.user).then( authData => {
        this.navCtrl.setRoot(MyGroupsPage);
        this.navCtrl.setRoot(TabsPage);
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
      this.navCtrl.setRoot(MyGroupsPage);
        this.navCtrl.setRoot(TabsPage);
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
      this.navCtrl.setRoot(MyGroupsPage);
        this.navCtrl.setRoot(TabsPage);
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

  hide() {
    this.hideMe = true;
  }

}
