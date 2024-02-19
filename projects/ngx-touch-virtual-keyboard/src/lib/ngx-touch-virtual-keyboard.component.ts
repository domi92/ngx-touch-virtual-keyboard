import {Component, OnDestroy, OnInit, HostListener, ElementRef, Inject, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {NgxTouchVirtualKeyboardService} from './ngx-touch-virtual-keyboard.service';
import {Subscription} from 'rxjs';
import {ICON_KEYBOARD, ICON_DELETE, KEYBOARD_LAYOUT} from '../public-api';

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
  show: boolean = false;

  private _textInputPassword = "";
  get textInputPassword(){

    return this._textInputPassword;
  }

  private numericOnlySubscription!: Subscription;
  private inputValueSubscription!: Subscription;
  private keyboardSubscription!: Subscription;
  private passwordSubscription!: Subscription;

  numericOnlyLayout: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', 'delete'],
  ];

  // @HostListener('document:click', ['$event'])
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    // If click was outside, prevent default action
    // console.log('HERE IT IS A CLICK' + event);
  }

  constructor(
    @Inject(ICON_KEYBOARD) public iconKeyboard: string,
    @Inject(ICON_DELETE) public iconDelete: string,
    @Inject(KEYBOARD_LAYOUT) public keyboardLayout: string[][],
    private elementRef: ElementRef,
    private keyboardService: NgxTouchVirtualKeyboardService
  ) {}

  protected base =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAMFBMVEUAAAD///////////////////////////////////9XgC7WAAAAEHRSTlMACj9PNGtZlBbTnGGzKLoAAABpSURBVHjaY2BAgHGMAQYw5gYMUADA3YDFYAcgRjE1EkwuB0EwAAJTVTcoQyeikAAAAASUVORK5CYII='; // Base64-encoded string of a simple 1x1 transparent PNG

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('mousedown', this.handleMouseDown);

    this.keyboardSubscription = this.keyboardService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.show = false;
    });

    this.numericOnlySubscription = this.keyboardService.isNumericOnly$.subscribe((isNumericOnly) => {
      this.isNumericOnly = isNumericOnly;
    });

    this.passwordSubscription = this.keyboardService.isPassword$.subscribe((isPassword) => {
      this.isPassword = isPassword;
    });

    this.inputValueSubscription = this.keyboardService.inputValue$.subscribe((value) => {
      this.onInputChange(value);
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
  }

  pressKey(key: string) {
    this.onInputChange(this.textInput + (this.isShift ? key.toUpperCase() : key));
  }

  clear(){

    this.textInput = "";
    this.keyboardService.changeValue(this.textInput);
  }

  emitDeletePressed() {
    // this.deletePressed.emit();
    this.onInputChange(this.textInput.slice(0, -1));
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

  shiftClick(){
    this.isShift = !this.isShift;
  }

  showHide(){
    if(this.isPassword)
      this.show = !this.show;
  }

  moveCursorLeft() {
  }

  moveCursorRight() {
  }
}
