import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Pipe({
  name: 'formatTimestampDate',
})
export class FormatTimestampDatePipe implements PipeTransform {
  transform(value: string) {
    if (value == '0001-01-01T00:00:00') {
      let dt_str = '-- ---,--';
      return dt_str;
    } else {
      const time = moment.utc(value).local()
      const localTime = time;
      let formatedlocaltime = localTime.format('lll');
      let inarr = formatedlocaltime.split(' ');

      let dt = inarr[1].replace(/,/, ' ');
      if (dt.length == 2) {
        dt = '0' + dt;
      }
      // console.log(console.log('=======' + inarr[1].length););
      let tm = inarr[3];
      if (tm.length < 5) {
        tm = '0' + tm;
      }
      let time_sp = tm + ' ' + inarr[4];
      let date_sp = dt + ' ' + inarr[0] + ',' + ' ' + inarr[2].substring(2);
      let complete_date = date_sp;
      return complete_date;
    }
  }
}
