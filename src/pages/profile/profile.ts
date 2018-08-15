import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , Loading, ViewController} from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from 'firebase/app';
import { Profile } from '../../models/profile.interface';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{   
   userProfile: Profile;
   loader: Loading;

    existingProfile = {} as Profile;

 
    
  ngOnInit(): void{
    
    this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.loader.present;
      this.data.getProfile(user).subscribe(profile =>{
        
          this.userProfile = <Profile>profile;
            this.loader.dismiss();
      })
    })
  }
  
  constructor(private loading: LoadingController,private data: DataService , private auth: AuthProvider,public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController) {
    
      
    this.loader = this.loading.create({
      content: 'Loading profile...'
    });
  }

  navigateToEditProfilePage(){
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile});
  }
  
}
