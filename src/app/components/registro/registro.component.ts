import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  registro() {
    this.authService
      .register(
        this.registroForm.value.nombre,
        this.registroForm.value.email,
        this.registroForm.value.password
      )
      .then((auth) => {
        this.router.navigate(['/Principal']);
      })
      .catch((err) => {
        this.toastr.error('No se pudo crear el usuario', err.message);
      });
  }
}
