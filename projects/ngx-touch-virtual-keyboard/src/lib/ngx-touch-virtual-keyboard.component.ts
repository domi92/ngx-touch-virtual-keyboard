import {Component, OnDestroy, OnInit, HostListener, ElementRef} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {NgxTouchVirtualKeyboardService} from './ngx-touch-virtual-keyboard.service';
import {Subscription} from 'rxjs';

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
  // @Output() keyPressed = new EventEmitter<string>();
  // @Output() deletePressed = new EventEmitter<void>();

  isOpen: boolean = false;

  textInput: string = '';
  isNumericOnly: boolean = false;

  private numericOnlySubscription!: Subscription;
  private inputValueSubscription!: Subscription;
  private keyboardSubscription!: Subscription;

  keyboardLayout: string[][] = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

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

  constructor(private elementRef: ElementRef, private keyboardService: NgxTouchVirtualKeyboardService) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('mousedown', this.handleMouseDown);

    this.keyboardSubscription = this.keyboardService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });

    this.numericOnlySubscription = this.keyboardService.isNumericOnly$.subscribe((isNumericOnly) => {
      this.isNumericOnly = isNumericOnly;
    });

    this.inputValueSubscription = this.keyboardService.inputValue$.subscribe((value) => {
      this.onInputChange(value);
    });
  }

  toggleKeyboard() {
    console.log('toggle' + this.isOpen);
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
    this.numericOnlySubscription.unsubscribe();
  }

  pressKey(key: string) {
    this.onInputChange(this.textInput + key);
  }

  emitDeletePressed() {
    // this.deletePressed.emit();
    this.onInputChange(this.textInput.slice(0, -1));
  }

  private onInputChange(value: string) {
    if (this.textInput === value) return;

    this.textInput = value;
    this.keyboardService.changeValue(this.textInput);
  }

  private handleMouseDown(event: MouseEvent) {
    // Prevent the default behavior which causes the input field to lose focus
    event.preventDefault();
  }
}
