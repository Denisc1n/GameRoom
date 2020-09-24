import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';

import { pairwise, filter, partition, map } from 'rxjs/operators';
import { ParPalabras } from '../../../classes/par-palabras';

@Component({
  selector: 'app-juego-union',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  @Input() pairs: ParPalabras[];

  @Output() leftpartSelected = new EventEmitter<number>();
  @Output() rightpartSelected = new EventEmitter<number>();
  @Output() leftpartUnselected = new EventEmitter();
  @Output() rightpartUnselected = new EventEmitter();

  @ContentChild('leftpart', { static: false }) leftpart_temp: TemplateRef<any>;
  @ContentChild('rightpart', { static: false }) rightpart_temp: TemplateRef<
    any
  >;

  public solvedPairs: ParPalabras[] = [];
  public unsolvedPairs: ParPalabras[] = [];

  test: number;
  successMessage: string;
  triesAmount: number = 0;

  private assignmentStream = new Subject<{ pair: ParPalabras; side: string }>();

  private solvedStream = new Observable<ParPalabras>();
  private failedStream = new Observable<string>();

  private s_Subscription: Subscription;
  private f_Subscription: Subscription;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.pairs.length; i++) {
      this.unsolvedPairs.push(this.pairs[i]);
    }

    const stream = this.assignmentStream.pipe(
      pairwise(),
      filter((comb) => comb[0].side != comb[1].side)
    );

    const [stream1, stream2] = partition(
      (comb) => comb[0].pair === comb[1].pair
    )(stream);

    this.solvedStream = stream1.pipe(map((comb) => comb[0].pair));

    this.failedStream = stream2.pipe(map((comb) => comb[0].side));

    this.s_Subscription = this.solvedStream.subscribe((pair) =>
      this.handleSolvedAssignment(pair)
    );

    this.f_Subscription = this.failedStream.subscribe((side) =>
      this.handleFailedAssignment(side)
    );
  }
  ngOnDestroy() {
    this.s_Subscription.unsubscribe();
    this.f_Subscription.unsubscribe();
  }

  private handleSolvedAssignment(pair: ParPalabras): void {
    this.solvedPairs.push(pair);
    this.remove(this.unsolvedPairs, pair);

    this.leftpartUnselected.emit();
    this.rightpartUnselected.emit();

    this.test = Math.random() * 10;
    this.triesAmount += 1;

    if (this.unsolvedPairs.length == 0) {
      this.toastr.success('¡Ganaste!, ¡Resolviste todas las relaciones!');
      this.successMessage =
        'Juego terminado en ' + this.triesAmount + ' intento/s.';
    }
  }

  public StartGame(): void {
    this.solvedPairs = [];
    this.unsolvedPairs = [];
    this.assignmentStream = new Subject<{ pair: ParPalabras; side: string }>();
    this.triesAmount = 0;
    this.ngOnInit();
  }

  private handleFailedAssignment(side1: string): void {
    if (side1 == 'left') {
      this.leftpartUnselected.emit();
    } else {
      this.rightpartUnselected.emit();
    }
    this.triesAmount += 1;
  }

  private remove(array: ParPalabras[], pair: ParPalabras) {
    let index = array.indexOf(pair);

    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
