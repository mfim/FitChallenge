import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { LoginPage } from '../pages/login/login';
//import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth'
import { TabsPage } from "../pages/tabs/tabs";
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { FcmProvider } from "../providers/fcm/fcm";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(afAuth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, fcm:FcmProvider, toastCtrl: ToastController) {
    // this observer checks if the user is already logged in, changing the rootpage
    const authObserver = afAuth.authState.subscribe( user => {
      if(user){
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }

    });
    platform.ready().then(() => {
      // Get a FCM token
      fcm.getToken()

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()

      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
