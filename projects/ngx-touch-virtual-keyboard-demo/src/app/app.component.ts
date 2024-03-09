import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'ngx-touch-virtual-keyboard-demo';

  isToggled: boolean = false;
  inputValue: string = '';
}
