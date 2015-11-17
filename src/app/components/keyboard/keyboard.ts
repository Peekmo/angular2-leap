import {Component, Input, NgFor, NgIf, NgClass, NgModel} from 'angular2/angular2';
import {HandElement} from '../../services/hand-element/hand-element';
import {ComponentManager} from '../../services/component-manager/component-manager';
import {KeyboardLetter} from './keyboard-letter';

@Component({
  selector: 'keyboard',
  templateUrl: 'app/components/keyboard/keyboard.html',
  styleUrls: ['app/components/keyboard/keyboard.css'],
  directives: [NgFor, NgIf, NgClass, NgModel, KeyboardLetter]
})
export class Keyboard {
  @Input() keyboardType;

  private keyboards: Object;
  private currentKeyboard: Array<string>;
  private text: string = '';
  private timer: boolean = false;

  constructor() {
    this.keyboards = {
      'azerty': [
        'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'next_line',
        'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'next_line',
        'w', 'x', 'c', 'v', 'b', 'n'
      ]
    }
  }

  onInit() {
    this.currentKeyboard = this.keyboards[this.keyboardType];
  }

  letterSelected(event) {
    if (!this.timer) {
      this.timer = true;
      this.text += event.letter;

      setTimeout(() => {
        this.timer = false;
      }, 50);
    }
  }
}
