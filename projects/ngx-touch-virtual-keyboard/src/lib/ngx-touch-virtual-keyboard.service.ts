import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxTouchVirtualKeyboardService {
  private isOpenSubject = new Subject<boolean>();
  isOpen$ = this.isOpenSubject.asObservable();

  private isNumericOnly: boolean = false;
  private isNumericOnlySubject = new Subject<boolean>();
  isNumericOnly$ = this.isNumericOnlySubject.asObservable();

  private inputValueSubject$ = new BehaviorSubject<string>('');

  get inputValue$(): Observable<string> {
    return this.inputValueSubject$.asObservable();
  }

  constructor() {}

  openKeyboard(value?: string) {
    this.isOpenSubject.next(true);
    this.isNumericOnlySubject.next(this.isNumericOnly);
    this.inputValueSubject$.next(value ?? '');
  }

  updateKeyboard(value?: string) {
    this.isNumericOnlySubject.next(this.isNumericOnly);
    this.inputValueSubject$.next(value ?? '');
  }

  closeKeyboard() {
    this.isOpenSubject.next(false);
    this.isNumericOnlySubject.next(this.isNumericOnly);
  }

  setNumericOnly(isNumericOnly: boolean) {
    this.isNumericOnly = isNumericOnly;
    this.isNumericOnlySubject.next(isNumericOnly);
  }

  changeValue(value: string) {
    this.inputValueSubject$.next(value ?? '');
  }
}
