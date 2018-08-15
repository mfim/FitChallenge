import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, ViewController} from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/profile.interface';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { ProfileViewPage } from '../profile-view/profile-view';

@IonicPage()
@Component({
  selector: 'page-search-friends', 
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {
  
  query: string;
  profileList: Profile[];

  @Output() selectedProfile: EventEmitter<Profile>

  constructor(public navCtrl: NavController,private data: DataService, private viewCtrl: ViewController) {
    this.selectedProfile = new EventEmitter<Profile>();
  }
  
  selectProfile(profile: Profile){
    this.selectedProfile.emit(profile);
    this.navCtrl.push(ProfileViewPage, { profile });
  }

  searchUser(query: string){
        const trimmedQuery =  query.trim();  

        if(trimmedQuery === query){
        this.data.searchUser(query).subscribe((profiles: Profile[]) =>{
        this.profileList = profiles;
   })}
  }
      
  
}
