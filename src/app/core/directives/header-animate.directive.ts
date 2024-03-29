import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeaderAnimate]',
  standalone: true,
})
export class HeaderAnimateDirective {
  constructor(private elementRef: ElementRef) {}

  @HostBinding('class.scroll') scrolled!: boolean;

  @HostListener('window:scroll') onScroll() {
    if (window.scrollY > this.elementRef.nativeElement.offsetHeight) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
