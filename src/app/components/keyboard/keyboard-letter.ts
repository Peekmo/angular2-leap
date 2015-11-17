import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/angular2';
import {HandElement} from '../../services/hand-element/hand-element';
import {ComponentManager} from '../../services/component-manager/component-manager';

@Component({
  selector: 'keyboard-letter',
  templateUrl: 'app/components/keyboard/keyboard-letter.html',
  events: ['selected']
})
export class KeyboardLetter {
  @Input() letter: string;
  @Output() selected: EventEmitter = new EventEmitter();

  private grabber: HandElement;
  private elmtRef: ElementRef;
  private manager: ComponentManager;

  constructor(grabber: HandElement, elmtRef: ElementRef, manager: ComponentManager) {
    this.grabber = grabber;
    this.elmtRef = elmtRef;
    this.manager = manager;
  }

  onInit() {
    this.manager.register(this);
  }

  onHover(event) {
    if (this.grabber.isIn(this.elmtRef)) {
      this.elmtRef.nativeElement.classList.add('hover');
    } else {
      this.elmtRef.nativeElement.classList.remove('hover');
    }
  }

  onSwipe(event) {
  }

  onKeytap(event) {
    if (this.grabber.isIn(this.elmtRef)) {
      this.selected.next({letter: this.letter});
    }
  }
}
