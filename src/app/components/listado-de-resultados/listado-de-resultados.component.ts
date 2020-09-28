import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css'],
})
export class ListadoDeResultadosComponent implements OnInit {
  usuarios: any[];

  constructor(private dataServ: DataService) {}

  ngOnInit() {
    this.getUpdatedUserList();
  }

  getUpdatedUserList() {
    this.dataServ
      .getUsers()
      .get()
      .then((users) => {
        this.usuarios = [];
        users.docs.map((element: any) => {
          this.usuarios.push({
            id: element.id,
            data: {
              nombre: element.data().nombre,
              puntajes: element.data().puntajes,
            },
          });
        });
      });
  }
}
