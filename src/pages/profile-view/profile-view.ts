import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController , Loading, ViewController,AlertController  } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile.interface';
import { Request } from '../../models/request';
import firebase, { auth } from 'firebase';
import { bindCallback } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage{
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  
  newrequest = {} as Request;
  profile = {} as Profile;
  userProfile: Profile;
  existingProfile = {} as Profile;
  filteredusers = [];
  temparr = [];
  selectedProfile: Profile;

  constructor(private data: DataService , private auth: AuthProvider,
    public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
    public alertCtrl: AlertController){
      this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
        this.authenticatedUser = user;
      })
 }

  ionViewWillLoad(){
    this.selectedProfile= this.navParams.get('profile');
  }
  
  sendRequest(selectedProfile) {
    
  
    this.newrequest.Sender = firebase.auth().currentUser.uid;
    this.newrequest.Recipient = this.selectedProfile.id;
    if (this.newrequest.Sender === this.newrequest.Recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + this.selectedProfile.firstName+' ' +this.selectedProfile.lastName,
        buttons: ['ok']
      });
    
      this.data.sendRequest(this.newrequest, this.authenticatedUser).then((res: any) => {
        if (res.success) {
          successalert.present();
          //let sentuser = this.filteredusers.indexOf(Recipient);
          //this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }
  
}

