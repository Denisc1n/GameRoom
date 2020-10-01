import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css'],
})
export class ListadoDeResultadosComponent implements OnInit {
  usuarios: any[];
  unsortedUsers: any[];
  direction = true;
  filter = new FormControl('');
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
  compare = (v1: number, v2: number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
  sort(column: string) {
    this.usuarios = this.usuarios.sort((a, b) => {
      const res = this.compare(
        a.data.puntajes[column],
        b.data.puntajes[column]
      );
      return this.direction ? res : -res;
    });
    this.direction = !this.direction;
  }

  search(text: string): any[] {
    return this.usuarios.filter((user) => {
      const term = text.toLowerCase();
      return user.data.nombre.toLowerCase().includes(term);
    });
  }
}
