import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLong',
})
export class FormatLongPipe implements PipeTransform {
  transform(value: string): string {
    if (value != null) {
      let latlong_in = value;
      let latlonArray = latlong_in.split(',');
      return latlonArray[1];
    } else {
      return '0';
    }
  }
}
