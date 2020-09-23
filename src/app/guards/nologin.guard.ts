import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NologinGuard implements CanActivate {
  constructor(private Afauth: AngularFireAuth, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.Afauth.authState.pipe(
      map((auth) => {
        if (auth == null || auth == undefined) {
          return true;
        } else {
          this.route.navigate(['/Principal']);
          return false;
        }
        // console.log(auth)
      })
    );
  }
}
