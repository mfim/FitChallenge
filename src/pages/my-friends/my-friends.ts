import { Component, Output ,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController ,Events, AlertController, ViewController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { DataService } from '../../providers/data/data.service';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile.interface';
import { ProfileViewPage } from '../profile-view/profile-view';
@IonicPage()
@Component({
  selector: 'page-my-friends',
  templateUrl: 'my-friends.html',
})
export class MyFriendsPage{   
  userProfile: Profile;
  userid;
  newrequest = {} as Request;
  myrequests;
  myfriends;
  query: string;
  profileList: Profile[];

  @Output() selectedProfile: EventEmitter<Profile>

  constructor(private modalCtrl: ModalController,public popoverCtrl: PopoverController,
    public navCtrl: NavController, public navParams: NavParams, public data: DataService,
    public events: Events, public alertCtrl: AlertController,public viewCtrl: ViewController){
      this.selectedProfile = new EventEmitter<Profile>();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  
  swipe(event) {
    if(event.direction === 4) {
      this.navCtrl.parent.select(1);
    }
  }
  
  searchFriends(){
    const searchFriends = this.modalCtrl.create("SearchFriendsPage");
    searchFriends.present();
  }
  
  ionViewWillEnter() {
    this.data.getRequests();
    this.data.getFriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.data.userdetails;
      
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.data.myfriends; 
    })
    
  }
  accept(item) {
    
    this.data.acceptRequest(item).then(() => {
      
      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to see what he is doing',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.data.deleteRequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }
  selectProfile(profile: Profile){
    this.selectedProfile.emit(profile);
    this.navCtrl.push(ProfileViewPage, { profile });
    this.viewCtrl.dismiss();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
