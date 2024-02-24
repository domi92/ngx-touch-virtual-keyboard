import { Directive, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Directive({
  selector: '[appRepeatAction]'
})
export class RepeatActionDirective implements OnDestroy {
  @Output() repeatAction = new EventEmitter<void>();
  private subscription!: Subscription;

  constructor() { }

  @HostListener('mousedown') onMouseDown() {
    // Emit the initial action
    this.repeatAction.emit();

    // Set interval to repeat the action every 500 milliseconds
    this.subscription = interval(180).pipe(
    ).subscribe(() => {
      this.repeatAction.emit();
    });
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.subscription?.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
