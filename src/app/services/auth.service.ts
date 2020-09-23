import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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

  getCurrentUser() {
    let user = this.AFauth.currentUser;
    return user;
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
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db
            .collection('usuarios')
            .doc(res.user.uid)
            .set({
              nombre: name,
              uid: uid,
              perfil: 'usuario',
              puntajes: [
                { adivina: 0 },
                { agilidad: 0 },
                { anagrama: 0 },
                { ppt: 0 },
                { simon: 0 },
                { tateti: 0 },
              ],
            });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
