import { Component, OnInit } from '@angular/core';
import { ElementArrayFinder } from 'protractor';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-listado-de-jugadores',
  templateUrl: './listado-de-jugadores.component.html',
  styleUrls: ['./listado-de-jugadores.component.css'],
})
export class ListadoDeJugadoresComponent implements OnInit {
  listado: any[];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getUpdatedUserList();
  }

  getUpdatedUserList() {
    this.dataService
      .getUsers()
      .get()
      .then((users) => {
        this.listado = [];
        users.docs.map((element: any) => {
          this.listado.push({
            id: element.id,
            data: {
              nombre: element.data().nombre,
              perfil: element.data().perfil,
              fechaDeRegistro: element.data().fechaDeRegistro.toDate(),
            },
          });
        });
      });
  }
}
