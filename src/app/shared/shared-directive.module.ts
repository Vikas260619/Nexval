import { NgModule } from '@angular/core';

// Directives
import { ImageSrcDirective } from '../directive/image-src.directive';
import { BackgroundImageDirective } from '../directive/background-image.directive';
import { ClickOutsiteDirective } from '../directive/click-outsite.directive';
const directive = [
  ImageSrcDirective,
  BackgroundImageDirective,
  ClickOutsiteDirective,
];

@NgModule({
  declarations: [...directive],
  exports: [...directive],
})
export class SharedDirectiveModule {}
