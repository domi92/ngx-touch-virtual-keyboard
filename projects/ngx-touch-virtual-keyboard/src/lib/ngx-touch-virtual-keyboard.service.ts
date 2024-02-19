import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export type KeyboardType = 'full' | 'number' | 'password';

@Injectable({
  providedIn: 'root',
})
export class NgxTouchVirtualKeyboardService {
  private isOpen = false;
  private isOpenSubject = new Subject<boolean>();
  isOpen$ = this.isOpenSubject.asObservable();

  private isPassword: boolean = false;
  private isPasswordSubject = new Subject<boolean>();
  get isPassword$(){
    return this.isPasswordSubject.asObservable();
  }

  private isNumericOnly: boolean = false;
  private isNumericOnlySubject = new Subject<boolean>();
  get isNumericOnly$() {
    return this.isNumericOnlySubject.asObservable();
  }

  private inputValueSubject$ = new BehaviorSubject<string>('');

  get inputValue$(): Observable<string> {
    return this.inputValueSubject$.asObservable();
  }

  constructor() {}

  openKeyboard(value?: string) {
    this.isOpen = true;
    this.isOpenSubject.next(this.isOpen);
    this.isNumericOnlySubject.next(this.isNumericOnly);
    this.inputValueSubject$.next(value ?? '');
  }

  updateKeyboard(value?: string) {
    this.isNumericOnlySubject.next(this.isNumericOnly);
    this.inputValueSubject$.next(value ?? '');
  }

  closeKeyboard() {
    this.isOpen = false;
    this.isOpenSubject.next(this.isOpen);
    this.isNumericOnlySubject.next(this.isNumericOnly);
  }

  setType(type: KeyboardType) {
    switch (type) {
      case 'full':
        this.isNumericOnly = false;
        this.isNumericOnlySubject.next(false);
        this.isPasswordSubject.next(false);
        break;
      case 'password':
        this.isNumericOnly = false;
        this.isNumericOnlySubject.next(false);
        this.isPasswordSubject.next(true);
        break;
      case 'number':
        this.isNumericOnly = true;
        this.isNumericOnlySubject.next(true);
        this.isPasswordSubject.next(false);
        break;

      default:
        break;
    }
  }

  changeValue(value: string) {
    this.inputValueSubject$.next(value ?? '');
  }
}
