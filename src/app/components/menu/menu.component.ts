import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private Afauth: AuthService) {}

  ngOnInit() {}

  logOut() {
    this.Afauth.logout();
  }
  navigateTo(event) {
    console.log(event);
  }
}
