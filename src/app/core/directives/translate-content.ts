import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
  } from '@angular/core';
  
  @Directive({
    selector: '[appHeaderAnimate]',
    standalone: true
  })
  export class ContentTranslateDirective {
    // constructor(private elementRef: ElementRef) { }
  
    // @HostBinding('style.content') content: string = {{"CONNECT" | translate}};
  
    // @HostListener('window:scroll') onScroll() {
    //   if (window.scrollY > this.elementRef.nativeElement.offsetHeight) {
    //     this.scrolled = true;
    //   } else {
    //     this.scrolled = false;
    //   }
    // }
  }