import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export type MapInputType = 'text' | 'password' | 'number' | 'date' | 'email' | 'url' | 'range';
export type MapKeyboardType = 'default' | 'number' | 'password' | 'tel' | 'date' | 'email';

@Injectable({
  providedIn: 'root',
})
export class NgxTouchVirtualKeyboardService {
  private isOpen = false;
  private readonly isOpenSubject = new Subject<{ input: ElementRef | undefined; isOpen: boolean }>();
  isOpen$ = this.isOpenSubject.asObservable();

  private keyboardType: MapKeyboardType = 'default';
  private readonly isPassword: boolean = false;
  private readonly isPasswordSubject = new Subject<boolean>();
  get isPassword$() {
    return this.isPasswordSubject.asObservable();
  }

  private readonly keyboardTypeSubject = new Subject<MapKeyboardType>();
  get keyboardType$() {
    return this.keyboardTypeSubject.asObservable();
  }

  private readonly inputValueSubject$ = new BehaviorSubject<string>('');

  get inputValue$(): Observable<string> {
    return this.inputValueSubject$.asObservable();
  }

  constructor() {}

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

  setType(type: string) {
    //todo evaluate if there is an overridden configuration provided
    //foreach in array search if exists key and set this.keyboardType = value

    let isPassword = false;
    switch (type) {
      case 'text':
        this.keyboardType = 'default';
        break;
      case 'email':
        this.keyboardType = 'email';
        break;
      case 'tel':
        this.keyboardType = 'tel';
        break;
      case 'date':
        this.keyboardType = 'date';
        break;
      case 'number':
      case 'range':
        this.keyboardType = 'number';
        break;
      case 'password':
        this.keyboardType = 'password';
        isPassword = true;
        break;

      default:
        this.keyboardType = 'default';
        break;
    }

    this.keyboardTypeSubject.next(this.keyboardType);
    this.isPasswordSubject.next(isPassword);
  }

  changeValue(value: string) {
    this.inputValueSubject$.next(value ?? '');
  }
}
