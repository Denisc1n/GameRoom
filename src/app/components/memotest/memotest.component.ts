import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css'],
})
export class MemotestComponent implements OnInit {
  private images = [
    { id: 1, url: '../../assets/imagenes/peach.png' },
    { id: 2, url: '../../assets/imagenes/lemon.png' },
    { id: 3, url: '../../assets/imagenes/apple.png' },
    { id: 4, url: '../../assets/imagenes/tangerine.png' },
    { id: 5, url: '../../assets/imagenes/cherries.png' },
    { id: 6, url: '../../assets/imagenes/strawberries.png' },
    { id: 7, url: '../../assets/imagenes/blueberries.png' },
    { id: 8, url: '../../assets/imagenes/pineapple.png' },
  ];
  public imagesInact = '../../assets/imagenes/card-back.png';
  public cards: Array<any>;
  private lastSelectId;
  private requiredPositives = 8;
  private positiveCounter: number;
  public triesCounter: number;
  public successMessage: string;

  constructor() {}

  ngOnInit() {
    this.StartGame();
  }

  public StartGame() {
    this.cards = [];
    this.lastSelectId = null;
    this.positiveCounter = 0;
    this.triesCounter = 0;
    this.successMessage = '';
    let countIndex = 0;

    for (let i = 0; i < this.requiredPositives * 2; i++) {
      if (countIndex === this.requiredPositives) {
        countIndex = 0;
      }

      const img = this.images[countIndex];

      this.cards.push({
        id: img.id,
        url: img.url,
        visible: false,
        active: true,
      });
      countIndex++;
    }
    this.RandomArray(this.cards);
  }

  public CardSelected(idx) {
    if (!this.cards[idx].active) {
      return;
    }
    this.cards[idx].visible = true;

    if (this.lastSelectId == null) {
      this.lastSelectId = idx;
      this.cards[idx].visible = true;
      this.cards[idx].active = false;
    } else {
      if (this.cards[this.lastSelectId].id === this.cards[idx].id) {
        this.positiveCounter = this.positiveCounter + 1;
        this.cards[idx].visible = true;
        this.cards[idx].active = false;
        this.lastSelectId = null;
      } else {
        setTimeout(() => {
          this.cards[this.lastSelectId].visible = false;
          this.cards[this.lastSelectId].active = true;
          this.cards[idx].visible = false;
          this.lastSelectId = null;
        }, 0.5 * 1000);
      }
    }
    if (this.requiredPositives === this.positiveCounter) {
      this.successMessage =
        'Juego terminado en ' + this.triesCounter + ' intento/s.';
    }
    this.triesCounter++;
  }

  RandomArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temporaryValue;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
