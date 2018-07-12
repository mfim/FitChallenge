import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Challenge } from "../../models/challenge";
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";

@IonicPage()
@Component({
  selector: 'page-new-challenge',
  templateUrl: 'new-challenge.html',
})
export class NewChallengePage {

  newChallenge = {} as Challenge ;

  constructor(private viewCtrl: ViewController, private firebaseData: FirebaseDbProvider) {
  }

  
  saveNewChallenge(): void {
    this.firebaseData.saveChallenge(this.newChallenge);
    this.viewCtrl.dismiss();
  }

}
