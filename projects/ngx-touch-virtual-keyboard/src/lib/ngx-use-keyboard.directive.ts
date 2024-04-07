import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxTouchVirtualKeyboardService } from './ngx-touch-virtual-keyboard.service';
import { MapKeyboardType } from './ngx-touch-virtual-keyboard.resources';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[useVirtualKeyboard]',
  inputs: ['keyboardType'],
})
export class UseKeyboardDirective implements OnInit, OnDestroy {
  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly keyboardService: NgxTouchVirtualKeyboardService
  ) {}

  private inputValueSubscription: Subscription | undefined;

  @Input('setKeyboardType') setKeyboardType: MapKeyboardType = 'default';

  @HostListener('input') // Listen for input events
  onInput() {
    this.onInputUpdate(this.elementRef.nativeElement.value);
  }

  @HostListener('focus') onFocus() {
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();
    // Open the keyboard using the service

    const inputType = this.elementRef.nativeElement.type;
    this.keyboardService.setType(inputType, this.setKeyboardType);
    this.keyboardService.openKeyboard(this.elementRef, this.elementRef.nativeElement.value);

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

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();
  }

  /**
   * When keyboard trigger an element change. Reflect into input element
   * @param value
   * @returns
   */
  protected onInputChange(value: string) {
    if (value === this.elementRef.nativeElement.value) return;

    this.elementRef.nativeElement.value = value;
  }

  /**
   * When input element change. Reflect change into keyboard component
   * @param value
   * @returns
   */
  protected onInputUpdate(value: string) {
    this.keyboardService.updateKeyboard(value);
  }
}
