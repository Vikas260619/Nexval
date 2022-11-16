import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyDate'
})
export class OnlyDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
