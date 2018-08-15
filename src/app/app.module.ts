import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, PopoverCmp } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EditProfileFormPage } from '../pages/edit-profile-form/edit-profile-form';

import { NativePageTransitions } from '@ionic-native/native-page-transitions';

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
import { PopoverPage } from '../pages/popover/popover';
import { DataService } from '../providers/data/data.service';
import { ProfilePage } from '../pages/profile/profile';
import { SearchFriendsPage } from '../pages/search-friends/search-friends';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ProfileViewPage } from '../pages/profile-view/profile-view';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ResetPasswordPage,
    RegisterPage,
    MyGroupsPage,
    MyFriendsPage,
    PopoverPage,
    EditProfileFormPage,
    ProfilePage,
    ProfileViewPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(), // offline persistence
    AngularFireDatabaseModule

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
    PopoverPage,
    EditProfileFormPage,
    ProfilePage,
    ProfileViewPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Health,
    HealthDataProvider,
    FirebaseDbProvider,
    NativePageTransitions,
    DataService    
  ]
})
export class AppModule {}
