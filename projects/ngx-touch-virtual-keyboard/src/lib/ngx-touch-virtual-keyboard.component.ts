import { Component, OnDestroy, OnInit, HostListener, ElementRef, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxTouchVirtualKeyboardService } from './ngx-touch-virtual-keyboard.service';
import { INGXKeyElement } from './ngx-key-element';
import { Subscription, interval } from 'rxjs';
import {
  ICON_DELETE,
  ICON_ERASE,
  ICON_EYE,
  ICON_EYE_SLASH,
  ICON_KEYBOARD,
  ICON_KEYBOARD_CLOSE,
  ICON_LEFT,
  ICON_RIGHT,
  ICON_SHIFT,
  ICON_TAB,
  KEYBOARD_LAYOUT,
  KEYBOARD_LAYOUT_NUMBER,
} from '../public-api';

@Component({
  selector: 'ngx-touch-virtual-keyboard',
  templateUrl: './ngx-touch-virtual-keyboard.component.html',
  styleUrls: ['./ngx-touch-virtual-keyboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
      state(
        'out',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class NgxTouchVirtualKeyboardComponent implements OnInit, OnDestroy {
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShift = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!event.shiftKey) {
      this.isShift = false;
    }
  }

  // @Output() keyPressed = new EventEmitter<string>();
  // @Output() deletePressed = new EventEmitter<void>();
  isOpen: boolean = false;
  textInput: string = '';
  isNumericOnly: boolean = false;
  isPassword: boolean = false;
  passwordShow: boolean = false;

  cursorPosition: number = 0;
  showCursor: boolean = true;

  private _textInputPassword = '';
  get textInputPassword() {
    return this._textInputPassword;
  }

  private numericOnlySubscription!: Subscription;
  private inputValueSubscription!: Subscription;
  private keyboardSubscription!: Subscription;
  private passwordSubscription!: Subscription;
  private subscription!: Subscription;

  // @HostListener('document:click', ['$event'])
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    // If click was outside, prevent default action
    // console.log('HERE IT IS A CLICK' + event);
  }

  constructor(
    @Inject(ICON_DELETE) public iconDelete: string,
    @Inject(ICON_ERASE) public iconErase: string,
    @Inject(ICON_EYE) public iconEye: string,
    @Inject(ICON_EYE_SLASH) public iconEyeSlash: string,
    @Inject(ICON_KEYBOARD) public iconKeyboard: string,
    @Inject(ICON_KEYBOARD_CLOSE) public iconKeyboardClose: string,
    @Inject(ICON_LEFT) public iconLeft: string,
    @Inject(ICON_RIGHT) public iconRight: string,
    @Inject(ICON_SHIFT) public iconShift: string,
    @Inject(ICON_TAB) public iconTab: string,
    @Inject(KEYBOARD_LAYOUT) public keyboardLayout: INGXKeyElement[][],
    @Inject(KEYBOARD_LAYOUT_NUMBER) public keyboardLayoutNumber: string[][],
    private readonly elementRef: ElementRef,
    private readonly keyboardService: NgxTouchVirtualKeyboardService,
  ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('mousedown', (e: MouseEvent) => {
      this.handleMouseDown(e);
    });

    this.keyboardSubscription = this.keyboardService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.passwordShow = false;
    });

    this.numericOnlySubscription = this.keyboardService.isNumericOnly$.subscribe((isNumericOnly) => {
      this.isNumericOnly = isNumericOnly;
    });

    this.passwordSubscription = this.keyboardService.isPassword$.subscribe((isPassword) => {
      this.isPassword = isPassword;
    });

    this.inputValueSubscription = this.keyboardService.inputValue$.subscribe((value) => {
      if (this.textInput !== value) {
        this.onInputChange(value);
        this.cursorPosition = value.length;
      }
    });

    this.subscription = interval(500)
      .pipe()
      .subscribe(() => {
        this.showCursor = !this.showCursor; // Toggle cursor visibility
      });
  }

  toggleKeyboard() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
    this.numericOnlySubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.inputValueSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  pressKey(key: string) {
    const charToAdd = this.isShift ? key.toUpperCase() : key;
    const updatedTextInput = `${this.textInput.slice(0, this.cursorPosition)}${charToAdd}${this.textInput.slice(this.cursorPosition)}`;

    if (this.textInput !== updatedTextInput) {
      this.onInputChange(updatedTextInput);
      this.cursorPosition++;
    }
  }

  clear() {
    this.textInput = '';
    this.keyboardService.changeValue(this.textInput);
  }

  emitDeletePressed() {
    const deletePosition = this.cursorPosition - 1;

    if (deletePosition >= 0 && deletePosition < this.textInput.length) {
      const updatedTextInput = this.textInput.slice(0, deletePosition) + this.textInput.slice(deletePosition + 1);

      this.onInputChange(updatedTextInput);
      this.cursorPosition = deletePosition;
    }
  }

  emitTab() {
    const focusableElements = document.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])',
    );

    const focusedElement = document.activeElement;
    if (focusedElement) {
      let currentIndex = Array.from(focusableElements).indexOf(focusedElement);

      if (!this.isShift) {
        if (currentIndex === -1) {
          currentIndex = 0;
        }

        const nextIndex = (currentIndex + 1) % focusableElements.length;
        const nextElement = focusableElements[nextIndex] as HTMLElement;
        nextElement.focus();
      } else {
        const prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
          (focusableElements[currentIndex] as HTMLElement).blur();
          return;
        }

        const nextElement = focusableElements[prevIndex] as HTMLElement;
        nextElement.focus();
      }
    }
  }

  private onInputChange(value: string) {
    if (this.textInput === value) return;

    this.textInput = value;
    this._textInputPassword = '*'.repeat(this.textInput.length);
    this.keyboardService.changeValue(this.textInput);
  }

  private handleMouseDown(event: MouseEvent) {
    // Prevent the default behavior which causes the input field to lose focus
    event.preventDefault();
  }

  protected isShift = false;

  shiftClick() {
    this.isShift = !this.isShift;
  }

  showHide() {
    if (this.isPassword) {
      this.passwordShow = !this.passwordShow;
    }
  }

  moveCursorLeft() {
    if (this.cursorPosition > 0) {
      this.cursorPosition--;
    }
  }

  moveCursorRight() {
    if (this.cursorPosition + 1 <= this.textInput.length) {
      this.cursorPosition++;
    }
  }
}
