import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { User } from "../../models/profile";
import { MyGroupsPage} from '../my-groups/my-groups';
import { Subscription } from 'rxjs/Subscription';
import { EditProfileFormPage } from '../edit-profile-form/edit-profile-form';




@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  public loading: Loading;
  user = {} as User;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    //this.authenticatedUser$ = this.authData.getAuthenticatedUser().subscribe((user: User) => {
      //this.authenticatedUser = user;
    //})
  }

  register(user){
    this.authData.register(user).then(() => {
      // change this later!!! to wait confirmation mail
      this.navCtrl.setRoot(EditProfileFormPage);
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
