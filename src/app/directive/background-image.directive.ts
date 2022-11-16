import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[nexaeiBackgroundImage]',
})
export class BackgroundImageDirective {
  imagePath: string = environment.imageBasePath;
  @Input() set nexaeiBackgroundImage(value: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-image',
      'url(' + this.imagePath + value + ')'
    );
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}
}
