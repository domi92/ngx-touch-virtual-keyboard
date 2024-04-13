import { ElementRef, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { KEYBOARD_MAP_INPUT_TO_LAYOUT } from '../public-api';
import { MapInputType, MapKeyboardType } from './ngx-touch-virtual-keyboard.resources';

@Injectable({
  providedIn: 'root',
})
export class NgxTouchVirtualKeyboardService {
  constructor(
    @Inject(KEYBOARD_MAP_INPUT_TO_LAYOUT)
    private readonly _keyboardMapLayoutType: { inputType: MapInputType; keyboardType: MapKeyboardType }[]
  ) {}

  private isOpen = false;
  private readonly isOpenSubject = new Subject<{ input: ElementRef | undefined; isOpen: boolean }>();
  private keyboardType: MapKeyboardType = 'default';
  private readonly isPasswordSubject = new Subject<boolean>();
  private readonly keyboardTypeSubject = new Subject<MapKeyboardType>();
  private readonly inputValueSubject$ = new BehaviorSubject<string>('');

  get isPassword$() {
    return this.isPasswordSubject.asObservable();
  }

  get keyboardType$() {
    return this.keyboardTypeSubject.asObservable();
  }

  get inputValue$(): Observable<string> {
    return this.inputValueSubject$.asObservable();
  }

  isOpen$ = this.isOpenSubject.asObservable();

  openKeyboard(inputElement: ElementRef, value?: string) {
    this.isOpen = true;
    this.isOpenSubject.next({ input: inputElement, isOpen: this.isOpen });
    this.keyboardTypeSubject.next(this.keyboardType);
    this.inputValueSubject$.next(value ?? '');
  }

  updateKeyboard(value?: string) {
    this.keyboardTypeSubject.next(this.keyboardType);
    this.inputValueSubject$.next(value ?? '');
  }

  closeKeyboard() {
    this.isOpen = false;
    this.isOpenSubject.next({ input: undefined, isOpen: this.isOpen });
    this.keyboardTypeSubject.next(this.keyboardType);
  }

  setType(type: string, forceType: MapKeyboardType | null = null) {
    //todo evaluate if there is an overridden configuration provided
    //foreach in array search if exists key and set this.keyboardType = value

    if (this.keyboardType === type) return;

    let isPassword = false;
    var mappedType = this._keyboardMapLayoutType.find((e) => e.inputType === type);

    if (mappedType) {
      this.keyboardType = mappedType.keyboardType;
      if (mappedType.inputType === 'password') isPassword = true;
    } else {
      this.keyboardType = 'default';
    }
    if (forceType) this.keyboardType = forceType;

    this.keyboardTypeSubject.next(this.keyboardType);
    this.isPasswordSubject.next(isPassword);
  }

  changeValue(value: string) {
    this.inputValueSubject$.next(value ?? '');
  }
}
