import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../classes/juego-tateti';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css'],
})
export class TatetiComponent implements OnInit {
  nuevoJuego: JuegoTateti;
  enJuego: boolean = false;
  turnoJugador = false;
  cuentaMarcas: number = 0;
  imgCruz: string = '../../../assets/imagenes/cruz.png';
  imgCirculo: string = '../../../assets/imagenes/circulo.png';
  save: boolean = false;
  user: any;
  contadorGanadas: number = 0;
  contadorPerdidas: number = 0;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.nuevoJuego = new JuegoTateti();
  }

  generarJugada() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    this.marcarJugada(row, col, true);
    this.save = true;
  }

  marcarJugada(row: number, column: number, jugadaGenerada: boolean) {
    if (jugadaGenerada) {
      if (this.nuevoJuego.tablero[row][column] != '' && this.cuentaMarcas < 9) {
        this.generarJugada();
      } else {
        this.cuentaMarcas++;
        this.nuevoJuego.tablero[row][column] = this.imgCruz;
        this.turnoJugador = true;
        if (this.nuevoJuego.verificarTresEnLinea(this.imgCruz)) {
          if (!this.nuevoJuego.verificar()) {
            this.toastr.error('Perdedor..', 'Te derrotaron');
            this.contadorPerdidas++;
          }
        }
      }
    } else {
      if (this.nuevoJuego.tablero[row][column] == '') {
        this.cuentaMarcas++;
        this.nuevoJuego.tablero[row][column] = this.imgCirculo;
        this.turnoJugador = false;
        if (!this.nuevoJuego.verificarTresEnLinea(this.imgCirculo)) {
          setTimeout(() => {
            this.generarJugada();
          }, 400);
        } else {
          this.toastr.success('Felicitaciones!', 'Ganaste esta vez');
          this.contadorGanadas++;
        }
      }
    }
  }

  nuevo() {
    this.save = false;
    this.nuevoJuego.juegoTerminado = false;
    this.nuevoJuego.reset();
    this.enJuego = true;
    this.turnoJugador = true;
    this.cuentaMarcas = 0;
  }

  guardar() {
    var result = this.contadorGanadas - this.contadorPerdidas;
    this.user.puntajes['tateti'] += result;
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
