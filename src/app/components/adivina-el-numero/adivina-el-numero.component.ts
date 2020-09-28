import { Component, OnInit } from '@angular/core';
import { JuegoAdivina } from '../../classes/juego-adivina';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css'],
})
export class AdivinaElNumeroComponent implements OnInit {
  nuevoJuego: JuegoAdivina;
  mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  user: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.nuevoJuego = new JuegoAdivina();
    this.ocultarVerificar = false;
  }

  setInputNumeroIngresado() {
    setTimeout(() => {
      (<HTMLInputElement>(
        document.getElementById('input-numero-ingresado')
      )).value = null;
      document.getElementById('input-numero-ingresado').focus();
    }, 1);
  }

  generarNumeroUsr() {
    this.nuevoJuego.generarNumero();
    this.contador = 0;
    // this.setInputNumeroIngresado();
  }

  verificarUsr() {
    this.contador++;
    this.ocultarVerificar = true;
    console.info('resultado: ', this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {
      this.mostrarMensaje('Lo adivinaste', true);
      this.nuevoJuego.numeroSecreto = 0;
    } else {
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = 'Primer intento fallido, vamos de nuevo';
          break;
        case 2:
          mensaje = 'No, te estarás Acercando???';
          break;
        case 3:
          mensaje = 'No es, yo creí que la tercera era la vencida';
          break;
        case 4:
          mensaje = 'No era el ' + this.nuevoJuego.numeroIngresado;
          break;
        case 5:
          mensaje = '5 intentos y nada';
          break;
        case 6:
          mensaje = 'Afortunado en el amor';
          break;

        default:
          mensaje = 'Ya le erraste ' + this.contador + ' veces';
          break;
      }
      this.mostrarMensaje(
        '#' +
          this.contador +
          ' ' +
          mensaje +
          ' - Ayuda: ' +
          this.nuevoJuego.retornarAyuda()
      );
    }
    console.info('resultado: ', this.nuevoJuego.gano);
  }

  mostrarMensaje(mensaje: string = 'este es el msg', ganador: boolean = false) {
    this.mensajes = mensaje;
    if (ganador) {
      this.toastr.success(mensaje, '¡Felicitaciones!');
    } else {
      this.toastr.error(mensaje, 'Seguí participando');
      this.setInputNumeroIngresado();
    }
    this.ocultarVerificar = false;
    this.nuevoJuego.numeroIngresado = 0;
  }

  guardar() {
    this.user.puntajes['adivina'] += 1;
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
    this.authService.getCurrentUser().then((data) => {
      data.docs.forEach((doc) => {
        this.user = doc.data();
      });
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
}
