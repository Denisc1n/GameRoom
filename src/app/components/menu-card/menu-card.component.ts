import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JuegosComponent } from '../juegos/juegos.component';
import { bootstrap } from '../../../../node_modules/bootstrap/js/dist';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'PPT':
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
        break;
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Tateti':
        this.router.navigate(['/Juegos/Tateti']);
        break;
      case 'Simon':
        this.router.navigate(['/Juegos/Simon']);
        break;
      case 'Memotest':
        this.router.navigate(['/Juegos/Memotest']);
        break;
      case 'Unir':
        this.router.navigate(['/Juegos/UnirPalabras']);
        break;
    }
  }
}
