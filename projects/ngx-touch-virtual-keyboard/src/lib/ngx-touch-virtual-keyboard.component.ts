import { Component, OnDestroy, OnInit, HostListener, ElementRef, Inject, ViewChild, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MapKeyboardType, NgxTouchVirtualKeyboardService } from './ngx-touch-virtual-keyboard.service';
import { INGXKeyElement } from './ngx-key-element';
import { Subscription, interval, BehaviorSubject } from 'rxjs';
import {
  ICON_BACKSPACE,
  ICON_ERASE,
  ICON_EYE,
  ICON_EYE_SLASH,
  ICON_KEYBOARD,
  ICON_KEYBOARD_CLOSE,
  ICON_LEFT,
  ICON_RIGHT,
  ICON_SHIFT,
  ICON_TAB,
  KEYBOARD_LAYOUT_DEFAULT,
  KEYBOARD_LAYOUT_NUMBER,
  KEYBOARD_LAYOUT_DATE,
  KEYBOARD_LAYOUT_EMAIL,
  KEYBOARD_LAYOUT_TEL,
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
        })
      ),
      state(
        'out',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class NgxTouchVirtualKeyboardComponent implements OnInit, OnDestroy {
  protected isShift = false;
  private capsLockActive: boolean = false;
  private _selectedKeyboardLayout: { layout: string; values: (INGXKeyElement | string)[][] }[];

  @Input('layout') layout: string = 'us';

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //capslock
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsLockActive = true;
      this.isShift = true;
    } else {
      this.capsLockActive = false;
      this.isShift = false;
    }
    if (event.shiftKey) {
      this.isShift = this.capsLockActive ? false : true;
    } else if (event.key === 'ArrowLeft') {
      this.moveCursorLeft();
    } else if (event.key === 'ArrowRight') {
      this.moveCursorRight();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!event.shiftKey) {
      this.isShift = this.capsLockActive ? true : false;
    }
    this.cursorPosition = this.inputElement ? this.inputElement.nativeElement.selectionEnd : this.textInput.length;
  }

  @ViewChild('beforeCursor') beforeCursor!: ElementRef;
  @ViewChild('cursor') cursor!: ElementRef;

  // @Output() keyPressed = new EventEmitter<string>();
  // @Output() deletePressed = new EventEmitter<void>();
  isOpen: boolean = false;
  textInput: string = '';
  keyboardType!: MapKeyboardType;
  isPassword: boolean = false;
  passwordShow: boolean = false;

  showCursor: boolean = true;
  private _cursorPosition: number = 0;

  set cursorPosition(value: number) {
    if (this._cursorPosition !== value) {
      this._cursorPosition = value;
      this.adjustCursorPosition();
    }
  }

  get cursorPosition() {
    return this._cursorPosition;
  }

  private _textInputPassword = '';
  get textInputPassword() {
    return this._textInputPassword;
  }

  private keyboardTypeSubscription!: Subscription;
  private inputValueSubscription!: Subscription;
  private keyboardSubscription!: Subscription;
  private passwordSubscription!: Subscription;
  private subscription!: Subscription;

  private inputElement: ElementRef<any> | undefined = undefined;

  // @HostListener('document:click', ['$event'])
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    // If click was outside, prevent default action
    // console.log('HERE IT IS A CLICK' + event);
  }

  constructor(
    @Inject(ICON_BACKSPACE) public iconDelete: string,
    @Inject(ICON_ERASE) public iconErase: string,
    @Inject(ICON_EYE) public iconEye: string,
    @Inject(ICON_EYE_SLASH) public iconEyeSlash: string,
    @Inject(ICON_KEYBOARD) public iconKeyboard: string,
    @Inject(ICON_KEYBOARD_CLOSE) public iconKeyboardClose: string,
    @Inject(ICON_LEFT) public iconLeft: string,
    @Inject(ICON_RIGHT) public iconRight: string,
    @Inject(ICON_SHIFT) public iconShift: string,
    @Inject(ICON_TAB) public iconTab: string,
    @Inject(KEYBOARD_LAYOUT_DEFAULT)
    private readonly _keyboardLayoutDefault: { layout: string; values: (INGXKeyElement | string)[][] }[],
    @Inject(KEYBOARD_LAYOUT_NUMBER)
    private readonly _keyboardLayoutNumber: { layout: string; values: (INGXKeyElement | string)[][] }[],
    @Inject(KEYBOARD_LAYOUT_TEL)
    private readonly _keyboardLayoutTel: { layout: string; values: (INGXKeyElement | string)[][] }[],
    @Inject(KEYBOARD_LAYOUT_EMAIL)
    private readonly _keyboardLayoutEmail: { layout: string; values: (INGXKeyElement | string)[][] }[],
    @Inject(KEYBOARD_LAYOUT_DATE)
    private readonly _keyboardLayoutDate: { layout: string; values: (INGXKeyElement | string)[][] }[],
    private readonly elementRef: ElementRef,
    private readonly keyboardService: NgxTouchVirtualKeyboardService
  ) {
    this._selectedKeyboardLayout = _keyboardLayoutDefault;
  }

  private readonly keyboardLayoutSubject = new BehaviorSubject<undefined | (INGXKeyElement | string)[][]>(undefined);

  protected get keyboardLayout$() {
    return this.keyboardLayoutSubject.asObservable();
  }

  private evalauteKeyboardLayout(): void {
    const res = this._selectedKeyboardLayout.find((e) => e.layout === this.layout);
    if (!res) {
      console.error(
        `layout: <${this.layout}> not found. Default is applied: <${this._selectedKeyboardLayout[0].layout}>`
      );
      this.layout = this._selectedKeyboardLayout[0].layout;
      this.keyboardLayoutSubject.next(this._selectedKeyboardLayout[0].values);
      return;
    }

    if (res === undefined) this.keyboardLayoutSubject.next(undefined);
    else this.keyboardLayoutSubject.next(res.values);
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('mousedown', (e: MouseEvent) => {
      this.handleMouseDown(e);
    });

    this.keyboardTypeSubscription = this.keyboardService.keyboardType$.subscribe((type) => {
      if (this.keyboardType === type) return;

      this.keyboardType = type;

      switch (this.keyboardType) {
        case 'default':
          this._selectedKeyboardLayout = this._keyboardLayoutDefault;
          break;
        case 'number':
          this._selectedKeyboardLayout = this._keyboardLayoutNumber;
          break;
        case 'password':
          this._selectedKeyboardLayout = this._keyboardLayoutDefault;
          break;
        case 'tel':
          this._selectedKeyboardLayout = this._keyboardLayoutTel;
          break;
        case 'date':
          this._selectedKeyboardLayout = this._keyboardLayoutDate;
          break;
        case 'email':
          this._selectedKeyboardLayout = this._keyboardLayoutEmail;
          break;
        default:
          this._selectedKeyboardLayout = this._keyboardLayoutDefault;
      }

      this.evalauteKeyboardLayout();
    });

    this.keyboardSubscription = this.keyboardService.isOpen$.subscribe((e) => {
      this.inputElement = e.input;
      this.isOpen = e.isOpen;
    });

    this.passwordSubscription = this.keyboardService.isPassword$.subscribe((isPassword) => {
      this.isPassword = isPassword;
    });

    this.inputValueSubscription = this.keyboardService.inputValue$.subscribe((value) => {
      if (this.textInput !== value) {
        this.onInputChange(value);
        this.cursorPosition = this.inputElement ? this.inputElement.nativeElement.selectionEnd : this.textInput.length;
      }
    });

    this.restartCursorVisibility();
  }

  toggleKeyboard() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
    this.keyboardTypeSubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.inputValueSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  pressKey(key: string) {
    const charToAdd = this.isShift ? key.toUpperCase() : key;
    const updatedTextInput = `${this.textInput.slice(0, this.cursorPosition)}${charToAdd}${this.textInput.slice(
      this.cursorPosition
    )}`;

    if (this.textInput !== updatedTextInput) {
      this.onInputChange(updatedTextInput);
      this.cursorPosition++;
    }
  }

  clear() {
    this.textInput = '';
    this.cursorPosition = 0;
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
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
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

  private restartCursorVisibility(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.showCursor = true;
    }

    this.subscription = interval(500).subscribe(() => {
      this.showCursor = !this.showCursor; // Toggle cursor visibility
    });
  }

  private adjustCursorPosition() {
    setTimeout(() => {
      if (this.beforeCursor && this.cursor) {
        this.restartCursorVisibility();
        const beforeCursorWidth = 3 + this.beforeCursor.nativeElement.offsetWidth;
        this.cursor.nativeElement.style.left = beforeCursorWidth + 'px';
      }

      // this.setSourceCursor();
    }, 0);
  }

  private setSourceCursor(): void {
    if (!this.inputElement) return;

    try {
      this.inputElement.nativeElement.setSelectionRange(this._cursorPosition, this._cursorPosition);
    } catch (error) {}
  }

  private moveCursorLeft() {
    if (this.cursorPosition > 0) {
      this.cursorPosition--;
    }
  }

  private moveCursorRight() {
    if (this.cursorPosition + 1 <= this.textInput.length) {
      this.cursorPosition++;
    }
  }

  protected arrowLeft() {
    this.moveCursorLeft();
    this.setSourceCursor();
  }
  protected arrowRight() {
    this.moveCursorRight();
    this.setSourceCursor();
  }

  shiftClick() {
    if (!this.capsLockActive) this.isShift = !this.isShift;
  }

  showHide() {
    if (this.isPassword) {
      this.passwordShow = !this.passwordShow;
      this.adjustCursorPosition();
    }
  }
}
