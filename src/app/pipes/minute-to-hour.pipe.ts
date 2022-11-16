import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'minuteToHour'
})
export class MinuteToHourPipe implements PipeTransform {

  transform(value: number){
    // let h = Math.floor(value / 60);          
    // var m = Math.floor(value % 3600 / 60);
    // return h+":"+m;
    var date = new Date(null);
       date.setSeconds(value);
       return date.toISOString().substr(11, 5);
   // let tm = Number(moment.duration(Number(value), 'seconds').hours()+'.'+moment.duration(Number(value),'seconds').minutes())
    //return tm;
  }

}
