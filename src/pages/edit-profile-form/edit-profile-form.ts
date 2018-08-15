import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile.interface';
import { DataService } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { removeSummaryDuplicates } from '@angular/compiler';
import { MyGroupsPage } from '../my-groups/my-groups';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-edit-profile-form',
  templateUrl: 'edit-profile-form.html',
})
export class EditProfileFormPage {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile = {} as Profile;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataService, private auth: AuthProvider) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }
  
  async saveProfile(){
    if(this.authenticatedUser){
    
    this.profile.id = this.authenticatedUser.uid;
    this.profile.email = this.authenticatedUser.email;
    this.navCtrl.setRoot(MyGroupsPage);
    this.navCtrl.setRoot(TabsPage);
    const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
    console.log(result);
    }

  }
}
