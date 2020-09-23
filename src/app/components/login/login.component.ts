import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

const EMAIL_GUEST = 'invitado@invitado.com';
const PASS_GUEST = 'invitado123';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        this.router.navigate(['/Principal']);
      })
      .catch((error) => {
        this.toastr.error('Los datos son incorrectos o no existe el usuario');
      });
  }

  loginInvitado() {
    this.authService
      .login(EMAIL_GUEST, PASS_GUEST)
      .then((res) => {
        this.router.navigate(['/Principal']);
      })
      .catch((error) => {
        this.toastr.error('Los datos son incorrectos o no existe el usuario');
      });
  }
}
