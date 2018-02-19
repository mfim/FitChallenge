import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { User } from "../../models/user";

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth){
  }

  async login(user: User){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  async resetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  googleLogin(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  async register(user: User){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
