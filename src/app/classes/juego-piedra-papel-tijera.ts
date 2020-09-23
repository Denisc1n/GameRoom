import { Juego } from '../classes/juego';

export class JuegoPiedraPapelTijera extends Juego {
  jugadas: Array<number> = [1, 2, 3];
  jugada: number = 0;
  jugadaUsuario: number = 0;
  resultado: number = -2; // no se inicio el juego

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Piedra, papel o tijera', gano, jugador);
  }

  generarJugada() {
    this.jugada = this.jugadas[Math.floor(Math.random() * this.jugadas.length)];
  }

  public verificarJugada(): void {
    switch (this.jugadaUsuario) {
      case 1: // PIEDRA
        if (this.jugada == 1) {
          this.resultado = 0; // empate
        } else {
          if (this.jugada == 2) this.resultado = -1;
          // usr pierde
          else this.resultado = 1; // usr gana
        }
        break;

      case 2: // PAPEL
        if (this.jugada == 1) {
          this.resultado = 1; // usr gana
        } else {
          if (this.jugada == 2) this.resultado = 0;
          // empate
          else this.resultado = -1; // usr pierde
        }
        break;

      case 3: // TIJERA
        if (this.jugada == 1) {
          this.resultado = -1; // usr pierde
        } else {
          if (this.jugada == 2) this.resultado = 1;
          // usr gana
          else this.resultado = 0; // empate
        }
        break;
    }
    this.verificar();
  }

  verificar(): boolean {
    if (this.resultado) this.gano = true;
    this.reset();
    return this.gano;
  }

  reset() {
    this.jugada = 0;
    this.jugadaUsuario = 0;
  }
}
