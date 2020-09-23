import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css'],
})
export class ListadoDeResultadosComponent implements OnInit {
  usuarios: any;

  constructor(private dataServ: DataService) {}

  ngOnInit() {
    this.dataServ.getUsers().subscribe((res) => {
      console.info('res', res);
      this.usuarios = res;
    });
  }
}
