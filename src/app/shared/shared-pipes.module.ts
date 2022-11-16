import { NgModule } from '@angular/core';

// Pipes
import { FormatTimePipe } from '../pipes/format-time.pipe';
const pipes = [FormatTimePipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class SharedPipes {}
