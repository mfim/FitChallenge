import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { LoginPage } from '../pages/login/login';

import { FIREBASE_CONFIG } from "./app.firebase.config";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { RegisterPage } from "../pages/register/register";
import { MyGroupsPage } from "../pages/my-groups/my-groups";
import { MyFriendsPage } from "../pages/my-friends/my-friends";

import { Health } from '@ionic-native/health';
import { AuthProvider } from '../providers/auth/auth';
import { HealthDataProvider } from '../providers/health-data/health-data';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ResetPasswordPage,
    RegisterPage,
    MyGroupsPage,
    MyFriendsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence() // offline persistence
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ResetPasswordPage,
    RegisterPage,
    MyGroupsPage,
    MyFriendsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Health,
    HealthDataProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
