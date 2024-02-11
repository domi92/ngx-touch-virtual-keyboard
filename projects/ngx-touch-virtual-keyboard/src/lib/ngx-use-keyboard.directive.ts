import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxTouchVirtualKeyboardService} from './ngx-touch-virtual-keyboard.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[useVirtualKeyboard]',
  inputs: ['isNumericOnly'],
})
export class UseKeyboardDirective implements OnInit, OnDestroy {
  private inputValueSubscription!: Subscription;
  @Input() isNumericOnly?: boolean = false;

  constructor(private elementRef: ElementRef<HTMLInputElement>, private keyboardService: NgxTouchVirtualKeyboardService) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();
  }

  @HostListener('input') // Listen for input events
  onInput() {
    this.onInputUpdate(this.elementRef.nativeElement.value);
  }

  @HostListener('focus') onFocus() {
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();
    // Open the keyboard using the service
    if (this.isNumericOnly === true) this.keyboardService.setNumericOnly(true);
    else this.keyboardService.setNumericOnly(false);

    this.keyboardService.openKeyboard(this.elementRef.nativeElement.value);

    this.inputValueSubscription = this.keyboardService.inputValue$.subscribe((value) => {
      this.onInputChange(value);
    });
  }

  @HostListener('blur') onBlur() {
    // Close the keyboard using the service
    // console.log('Directive INIT...' + this.isNumericOnly);
    // if (this.isNumericOnly === true) {
    //   this.keyboardService.setNumericOnly(true);
    // } else this.keyboardService.setNumericOnly(false);
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();

    this.keyboardService.closeKeyboard();
  }

  /**
   * When keyboard trigger an element change. Reflect into input element
   * @param value
   * @returns
   */
  onInputChange(value: string) {
    if (value === this.elementRef.nativeElement.value) return;

    this.elementRef.nativeElement.value = value;
  }

  /**
   * When input element change. Reflect change into keyboard component
   * @param value
   * @returns
   */
  onInputUpdate(value: string) {
    this.keyboardService.updateKeyboard(value);
  }
}
