import { Directive, ElementRef, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appClickOutsite]',
})
export class ClickOutsiteDirective {
  constructor(private elementRef: ElementRef) {
    this.clickedOutside.next(false);
  }

  @Output() clickedOutside: Subject<boolean> = new Subject<boolean>();
  @HostListener('document:click', ['$event.target']) public onClick(
    target: any
  ) {
    const isClickedInside = this.elementRef.nativeElement.contains(target);
    if (!isClickedInside) {
      this.clickedOutside.next(true);
    } else {
      this.clickedOutside.next(false);
    }
  }
}
