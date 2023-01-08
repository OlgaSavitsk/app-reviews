import {
  Directive, ElementRef, HostListener, Input, OnInit, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMoveFrame]',
})
export class MoveFrameDirective implements OnInit {
  @Input('appMoveFrame') public index!: number;

  transform!: string;

  constructor(private randerer: Renderer2, private el: ElementRef) { }

  public ngOnInit(): void {
    this.randerer.setStyle(this.el.nativeElement, 'transform', this.setIndexMove());
  }

  setIndexMove() {
    console.log(this.index, 'dir');
    if (this.index) {
      this.transform = 'translate(100px)';
    }
  }

}
