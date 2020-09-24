import { Component, OnInit } from '@angular/core';
import { Pares } from './animals';

@Component({
  selector: 'app-unir-palabras',
  templateUrl: './unir-palabras.component.html',
  styleUrls: ['./unir-palabras.component.css'],
})
export class UnirPalabrasComponent implements OnInit {
  animals = Pares;
  leftpartSelectedId: number = -1;
  rightpartSelectedId: number = -1;

  constructor() {}

  ngOnInit() {}

  onLeftpartSelected(id: number): void {
    this.leftpartSelectedId = id;
  }

  onRightpartSelected(id: number): void {
    this.rightpartSelectedId = id;
  }

  onLeftpartUnselected(): void {
    this.leftpartSelectedId = -1;
  }

  onRightpartUnselected(): void {
    this.rightpartSelectedId = -1;
  }
}
