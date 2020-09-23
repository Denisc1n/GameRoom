import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../classes/juego-piedra-papel-tijera';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css'],
})
export class PiedraPapelTijeraComponent implements OnInit {
  nuevoJuego: JuegoPiedraPapelTijera;
  repetidor: any;
  stop: boolean = false;
  enJuego: boolean = false;
  imagenJugada: string = '../../../assets/imagenes/piedra.png';
  imagenJugadaUsuario: string = '../../../assets/imagenes/tijera.png';
  jugadaSeleccionada: number;
  contadorGanadas: number = 0;
  contadorPerdidas: number = 0;
  user: any;
  save: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }

  nuevo() {
    this.save = false;
    this.stop = false;
    this.enJuego = true;
    this.repetidor = setInterval(() => {
      this.nuevoJuego.generarJugada();
      this.setImagenes();
      if (this.stop) {
        this.nuevoJuego.jugadaUsuario = this.jugadaSeleccionada;
        this.setImagenes();
        clearInterval(this.repetidor);
        this.verificar();
        this.save = true;
      }
    }, 80);
  }

  detener(jugada: number) {
    this.jugadaSeleccionada = jugada;
    this.stop = true;
  }

  verificar() {
    this.nuevoJuego.verificarJugada();
    this.mostrarMensaje();
    this.enJuego = false;
  }

  /**
   *  -1 (usuario pierde)
   *   0 (empate)
   *   1 (usuario gana)
   */
  mostrarMensaje() {
    switch (this.nuevoJuego.resultado) {
      case -1:
        this.toastr.error('¡Perdiste!, ¡Volve a Intentar!');
        this.contadorPerdidas++;
        break;
      case 0:
        this.toastr.warning('¡Empate!', '¡Estuvo Cerca! ¿Va de nuevo?');
        break;
      case 1:
        this.toastr.success('Nada mejor que Ganar.', '¡Felicitaciones!');
        this.contadorGanadas++;
        break;
    }
  }

  setImagenes() {
    switch (this.nuevoJuego.jugada) {
      case 1:
        this.imagenJugada = '../../../assets/imagenes/piedra.png';
        break;
      case 2:
        this.imagenJugada = '../../../assets/imagenes/papel.png';
        break;
      case 3:
        this.imagenJugada = '../../../assets/imagenes/tijera.png';
        break;
    }
    switch (this.nuevoJuego.jugadaUsuario) {
      case 0:
        this.imagenJugadaUsuario = '../../../assets/imagenes/ppt.png';
        break;
      case 1:
        this.imagenJugadaUsuario = '../../../assets/imagenes/piedra.png';
        break;
      case 2:
        this.imagenJugadaUsuario = '../../../assets/imagenes/papel.png';
        break;
      case 3:
        this.imagenJugadaUsuario = '../../../assets/imagenes/tijera.png';
        break;
    }
  }

  guardar() {
    var result = this.contadorGanadas - this.contadorPerdidas;
    this.user.puntajes['ppt'] += result;
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
