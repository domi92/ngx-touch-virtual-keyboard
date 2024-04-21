import { Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxTouchVirtualKeyboardService } from './ngx-touch-virtual-keyboard.service';
import { MapKeyboardType } from './ngx-touch-virtual-keyboard.resources';
import { Subscription } from 'rxjs';
import { FOCUS_AUTO_CLOSE } from '../public-api';

@Directive({
  selector: '[useVirtualKeyboard]',
  inputs: ['keyboardType'],
})
export class UseKeyboardDirective implements OnInit, OnDestroy {
  constructor(
    @Inject(FOCUS_AUTO_CLOSE) private autoClose: boolean,
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly keyboardService: NgxTouchVirtualKeyboardService
  ) {}

  private inputValueSubscription: Subscription | undefined;

  @Input('setKeyboardType') setKeyboardType: MapKeyboardType | null = null;

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
    // if (this.isNumericOnly === true) {
    //   this.keyboardService.setNumericOnly(true);
    // } else this.keyboardService.setNumericOnly(false);
    if (this.inputValueSubscription) this.inputValueSubscription.unsubscribe();

    if (this.autoClose) this.keyboardService.closeKeyboard();
  }

  ngOnInit() {
    this.keyboardService.register();
  }

  ngOnDestroy(): void {
    this.keyboardService.unregister();
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
