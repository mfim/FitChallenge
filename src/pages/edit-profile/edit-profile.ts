import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth';
import { Subscription } from 'rxjs/Subscription';

import { User } from 'firebase/app';
import { Profile } from '../../models/profile.interface';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  
  profile = {} as Profile;
  
  userProfile: Profile;
  existingProfile = {} as Profile;


   
 ngOnInit(): void{

   this.auth.getAuthenticatedUser().subscribe((user: User) => {
  
     this.data.getProfile(user).subscribe(profile =>{
       
         this.userProfile = <Profile>profile;
  
     })
   })
 }
 
 constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataService, private auth: AuthProvider) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
    this.authenticatedUser = user;  })
}
   async updateProfile(){
    if(this.authenticatedUser){
    this.profile.email = this.authenticatedUser.email;
    this.navCtrl.setRoot(ProfilePage);
    const result = await this.data.updateProfile(this.authenticatedUser, this.profile);
    console.log(result);
    }
  }
}
