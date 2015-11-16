import {Component, ElementRef} from 'angular2/angular2';
import {HandElement} from '../../services/hand-element/hand-element';
import {ComponentManager} from '../../services/component-manager/component-manager';

@Component({
  selector: 'keyboard',
  templateUrl: 'app/components/keyboard/keyboard.html',
  styleUrls: ['app/components/keyboard/keyboard.css'],
  directives: []
})
export class Keyboard {
  private grabber: HandElement;
  private elmtRef: ElementRef;
  private manager: ComponentManager

  constructor(grabber: HandElement, elmtRef: ElementRef, manager: ComponentManager) {
    this.grabber = grabber;
    this.elmtRef = elmtRef;
    this.manager = manager;
  }

  onInit() {
    this.manager.register(this);
  }

  onHover(event) {
    console.log("keyboard hover");
  }

  onSwipe(event) {
    console.log("keyboard swipe");
  }

  onKeytap(event) {
    console.log("keyboard tap");
  }
}
