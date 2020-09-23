import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-de-jugadores',
  templateUrl: './listado-de-jugadores.component.html',
  styleUrls: ['./listado-de-jugadores.component.css'],
})
export class ListadoDeJugadoresComponent implements OnInit {
  listado: any;
  constructor() {}
  ngOnInit(): void {}
}
