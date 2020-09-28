import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './data.service';
import { userInfo } from 'os';

interface IPuntajes {
  agilidad: number;
  adivina: number;
  anagrama: number;
  ppt: number;
  simon: number;
  tateti: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  private userData;
  private aa;
  async getCurrentUser() {
    let currentUser;
    currentUser = (await this.AFauth.currentUser).uid;
    return this.db
      .collection('usuarios')
      .ref.where('uid', '==', currentUser)
      .get();

    //let user = this.AFauth.currentUser;
    return;
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });

      //const user = this.getCurrentUser().then((user) => console.log(user));
    });
  }

  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/Login']);
    });
  }

  register(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          this.db
            .collection('usuarios')
            .doc(res.user.uid)
            .set({
              nombre: name,
              uid: uid,
              perfil: 'Jugador',
              isActive: true,
              fechaDeRegistro: new Date(),
              puntajes: {
                adivina: 0,
                agilidad: 0,
                anagrama: 0,
                ppt: 0,
                tateti: 0,
                unirPalabras: 0,
                memotest: 0,
              },
            });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
