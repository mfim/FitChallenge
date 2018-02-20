import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { FIREBASE_CONFIG } from "./app.firebase.config";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { RegisterPage } from "../pages/register/register";
import { MyGroupsPage } from "../pages/my-groups/my-groups";
import { MyFriendsPage } from "../pages/my-friends/my-friends";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ResetPasswordPage,
    RegisterPage,
    MyGroupsPage,
    MyFriendsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ResetPasswordPage,
    RegisterPage,
    MyGroupsPage,
    MyFriendsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
