import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[nexaeiImageSrc]',
})
export class ImageSrcDirective implements OnInit {
  imagePath: string = environment.imageBasePath;
  @Input() set nexaeiImageSrc(value: string) {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'src',
      this.imagePath + value
    );
  }
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}
}
