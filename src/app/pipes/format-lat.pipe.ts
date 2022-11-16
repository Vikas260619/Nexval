import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLat',
})
export class FormatLatPipe implements PipeTransform {
  transform(value: string): string {
    if (value != null) {
      let latlong_in = value;
      let latlonArray = latlong_in.split(',');
      return latlonArray[0];
    } else {
      return '0';
    }
  }
}
