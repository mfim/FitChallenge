import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

/**
 * Generated class for the MyGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-groups',
  templateUrl: 'my-groups.html',
})
export class MyGroupsPage {

  
  constructor(private modalCtrl: ModalController,public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams) {
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  
  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGroupsPage');
  }

  newChallenge(){
    const newChallenge = this.modalCtrl.create("NewChallengePage");
    newChallenge.present();
  }
}
