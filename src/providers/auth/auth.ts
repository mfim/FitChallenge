import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from "../../models/profile";


@Injectable()
export class AuthProvider {

  private uid: string;
  firedata = firebase.database().ref('/userProfile');

  constructor(public afAuth: AngularFireAuth, ) {
  }

  async login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  async resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  async register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  
  async saveProfile(user: User) {
    //return this.afAuth.auth.
  }

  setUid(uid: string): void {
    this.uid = uid;
  }

  getUid(): string {
    return this.uid;
  }


  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
