import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenFilter'
})
export class TokenFilterPipe implements PipeTransform {

  transform(value:string){
    let V:any =value.split(": ");
    return V[1];
  }

}
