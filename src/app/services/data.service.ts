import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  user: any;
  dbUsersRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.dbUsersRef = this.db.collection('usuarios');
  }

  getUsers() {
    return this.dbUsersRef.valueChanges();
  }

  getUserByUid(user: Promise<firebase.User>) {
    console.log(user);
    if (user.then.name !== '')
      return this.dbUsersRef.doc(user.then.name).valueChanges();
  }

  updatePuntaje(userUid, puntos) {
    console.info('puntajes updates', puntos);
    return this.dbUsersRef.doc(userUid).update({
      puntajes: puntos,
    });
  }
}
