import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle',
})
export class ShufflePipe implements PipeTransform {
  transform(a: any[], args: string[]): any[] {
    let b: any[] = [];

    for (let i = 0; i < a.length; i++) {
      b.push(a[i]);
    }

    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }

    return b;
  }
}
