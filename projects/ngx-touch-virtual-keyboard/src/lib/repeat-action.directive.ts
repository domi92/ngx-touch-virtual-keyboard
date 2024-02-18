import { Directive, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appRepeatAction]'
})
export class RepeatActionDirective implements OnDestroy {
  @Output() repeatAction = new EventEmitter<void>();
  private interval: any;

  constructor(private elementRef: ElementRef) { }

  @HostListener('mousedown') onMouseDown() {
    // Emit the initial action
    this.repeatAction.emit();

    // Set interval to repeat the action every 500 milliseconds
    this.interval = setInterval(() => {
      this.repeatAction.emit();
    }, 180);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onMouseUp(event: MouseEvent) {
    // Clear the interval to stop repeating the action
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    // Ensure the interval is cleared when the directive is destroyed
    clearInterval(this.interval);
  }
}
