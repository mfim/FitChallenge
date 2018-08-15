import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Challenge } from "../../models/challenge";
import { Profile } from '../../models/profile.interface';
import { FirebaseDbProvider } from "../../providers/firebase-db/firebase-db";
import { DataService } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-new-challenge',
  templateUrl: 'new-challenge.html',
})
export class NewChallengePage {

  query: string;
  profileList: Profile[];
  newChallenge = {} as Challenge;
  myrequests;
  myfriends;
  stringfriends;

  @Output() selectedProfile: EventEmitter<Profile>

  constructor(private viewCtrl: ViewController, public events: Events, private firebaseData: FirebaseDbProvider, public navCtrl: NavController, private data: DataService) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  ionViewWillEnter() {
    this.data.getFriends();
    this.myfriends = [];
      this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.data.myfriends;
    })

  }

  saveNewChallenge(): void {
    this.firebaseData.saveChallenge(this.newChallenge);
    this.viewCtrl.dismiss();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
  }


}

