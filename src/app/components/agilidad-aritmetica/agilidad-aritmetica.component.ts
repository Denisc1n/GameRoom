import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JuegoAgilidad } from '../../classes/juego-agilidad';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css'],
})
export class AgilidadAritmeticaComponent implements OnInit {
  nuevoJuego: JuegoAgilidad;
  enJuego: boolean;
  tiempo: number;
  repetidor: any;
  user: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.enJuego = false;
    this.tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
  }

  setInputNumeroIngresado() {
    setTimeout(() => {
      (<HTMLInputElement>(
        document.getElementById('input-numero-ingresado')
      )).value = null;
      document.getElementById('input-numero-ingresado').focus();
    }, 1);
  }

  nuevo(): void {
    this.nuevoJuego.reset();
    this.setInputNumeroIngresado();
    this.enJuego = true;
    this.nuevoJuego.generarOperacion();
    this.repetidor = setInterval(() => {
      this.tiempo--;
      if (this.tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.tiempo = 5;
      }
    }, 900);
  }

  verificar() {
    if (this.nuevoJuego.verificar()) {
      this.mostrarMensaje('¡Ganaste!', true);
    } else {
      this.mostrarMensaje('¡Perdiste! ¡Probá de nuevo!', false);
    }
    this.enJuego = false;
  }

  mostrarMensaje(mensaje: string = '(PlaceHolder)', ganador: boolean = false) {
    if (ganador) {
      this.toastr.success(mensaje, '¡Felicitaciones!');
    } else {
      this.toastr.error(mensaje, 'Seguí participando');
    }
  }

  guardar() {
    this.user.puntajes['agilidad'] += 1;
    this.dataService
      .updatePuntaje(this.user.uid, this.user.puntajes)
      .then(() => {
        this.toastr.success('Puntos guardados');
      })
      .catch((err) => {
        this.toastr.error('Al guardar: ' + err.message, 'Error');
      });
  }

  getCurrentUser() {
    let user = this.authService.getCurrentUser();
    this.dataService.getUserByUid(user).subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
}
