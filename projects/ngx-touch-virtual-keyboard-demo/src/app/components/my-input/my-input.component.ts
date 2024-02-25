import { Component } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})
export class MyInputComponent {
  inputValue: string = '';

  isFocused: boolean = false;

  onInputFocus(): void {
    this.isFocused = true;
  }

  onInputBlur(): void {
    this.isFocused = false;
  }
}
