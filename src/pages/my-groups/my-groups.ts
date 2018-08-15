import { Component,EventEmitter,Output } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Events } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { Challenge } from "../../models/challenge";
import { Profile } from '../../models/profile.interface';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { DataService } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-my-groups',
  templateUrl: 'my-groups.html',
})
export class MyGroupsPage {

  query: string;
  profileList: Profile[];
  
  myrequests;
  myfriends;
  @Output() selectedProfile: EventEmitter<Profile>

  constructor(private modalCtrl: ModalController, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, private firabaseData: FirebaseDbProvider,private data: DataService,public events: Events) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  swipe(event) {
    if (event.direction === 2) {
      this.navCtrl.parent.select(2);
    }
    if (event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGroupsPage');
  }

  newChallenge() {
    const newChallenge = this.modalCtrl.create("NewChallengePage");
    newChallenge.present();
  }
  ionViewWillEnter() {
    this.firabaseData.offlineActivityPersistence();
        
  
  }



  ionViewDidLeave() {
  
  }
}
