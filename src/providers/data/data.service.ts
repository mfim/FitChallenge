import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Events } from 'ionic-angular';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile.interface';
import { Observable } from "rxjs/Observable";
import { Request } from '../../models/request';
import firebase from 'firebase';
import { AuthProvider } from '../auth/auth';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class DataService {
  userdetails;
  myfriends = [];
  myrequests;
  competitors = [];

  firedata = firebase.database().ref('/userProfile');
  firereq = firebase.database().ref(`/requests`);
  firefriends = firebase.database().ref('/friends');

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;

  profiles = {} as Profile;
  usertemp: User;

  constructor(private database: AngularFireDatabase, public events: Events, public auth: AuthProvider) {
  }

  searchUser(firstName: string) {
    const query = this.database.list('/userProfile/',
      ref => ref.orderByChild('firstName').equalTo(firstName));

    return query.valueChanges();
  }



  getProfile(user: User) {
    this.profileObject = this.database.object(`/userProfile/${user.uid}`);
    return this.profileObject.valueChanges();

  }

  getProfiles(profiles) {
    for (var i in profiles) {
      const query = this.database.list('/userProfile/',
        ref => ref.orderByChild('id').equalTo(profiles[i]));
      this.competitors.push(query.valueChanges());
    }
    return this.competitors;
  }


  getProfileNoUser(user: string) {
    const query = this.database.list('/userProfile/',
      ref => ref.orderByChild('id').equalTo(user));
    return query.valueChanges();
  }
  async saveProfile(user: User, profile: Profile) {

    this.profileObject = this.database.object(`/userProfile/${user.uid}`);
    try {
      await this.profileObject.set(profile);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/userProfile/${user.uid}`);

    try {
      await this.profileObject.update(profile);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
  async sendRequest(req: Request, user: User) {

    var promise = new Promise((resolve, reject) => {

      this.firereq.child(req.Recipient).push({
        sender: req.Sender
      }).then(() => {
        resolve({ success: true });
      })
    })
    return promise;

  }

  getRequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      var userid = firebase.auth().currentUser.uid;
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.auth.getallusers().then((res) => {

        var allusers = res;
        var control = 0;
        this.userdetails = [];

        for (var j in myrequests) {
          for (var key in allusers) {
            if (allusers[key].id != userid) {
              if (allusers[key].id == myrequests[j]) {
                if (this.alreadyFriends(allusers[key]) == false) {
                  //for (var x in this.userdetails) {
                    //if (this.userdetails[key] == this.userdetails[x]) {
                      //control++;
                      //if (control <= 1) {
                        this.userdetails.push(allusers[key]);
                      //}
                    //}
                  //}
                }
              }
            }
          }
        }
        this.events.publish('gotrequests');
      })
    })

  }

  acceptRequest(friend) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: friend.id
      }).then(() => {
        this.firefriends.child(friend.id).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleteRequest(friend).then(() => {
            resolve(true);
          })

        })//.catch((err) => {
        //reject(err);
        //})
      })//.catch((err) => {
      //reject(err);
      //})
    })
    return promise;
  }

  deleteRequest(friend) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(friend.id).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  getFriends() {

    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.auth.getallusers().then((users) => {
        this.myfriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (users[key].id != firebase.auth().currentUser.uid) {// } else {
              if (friendsuid[j] == users[key].id) {
                this.myfriends.push(users[key]);
              }
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }
  alreadyFriends(friend) {
    var contidition: boolean;
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends) {
        friendsuid.push(allfriends[i].uid);
      }
      for (var j in friendsuid) {
        if (friendsuid[j] == friend.id) {
          contidition = true;
        } else { contidition = false; }
      }

    })
    return contidition;
  }

  async saveChallenge(user: User, profile: Profile) {

  }

}
