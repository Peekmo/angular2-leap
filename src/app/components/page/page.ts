import {Component, NgIf} from 'angular2/angular2';
import {Keyboard} from '../keyboard/keyboard';
import {LinkElement} from '../link-element/link-element';

@Component({
  selector: 'page',
  templateUrl: 'app/components/page/page.html',
  styleUrls: ['app/components/page/page.css'],
  providers: [],
  directives: [LinkElement, Keyboard, NgIf],
  pipes: []
})
export class Page {
  private showKeyboard: boolean = false;

  constructor() {}

  showMessage() {
    return this.showKeyboard ? 'Hide keyboard' : 'Show keyboard';
  }

  toggleKeyboard() {
    this.showKeyboard = !this.showKeyboard;
  }
}
