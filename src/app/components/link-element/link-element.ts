import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/angular2';
import {HandElement} from '../../services/hand-element/hand-element';

@Component({
  selector: 'link-element',
  template: `
    <span>
      <a href="{{ href }}">{{ name }}</a>
    </span>
  `,
  events: ['register']
})
export class LinkElement {
  @Input() href: string;
  @Input() name: string;
  @Output() register: EventEmitter = new EventEmitter();
  private grabber: HandElement;
  private elmtRef: ElementRef;
  private selected: boolean = false;

  constructor(grabber: HandElement, elmtRef: ElementRef) {
    this.grabber = grabber;
    this.elmtRef = elmtRef;
  }

  onInit() {
    this.register.next({element: this});
  }

  onHover(event) {
    if (this.grabber.isIn(this.elmtRef)) {
      this.elmtRef.nativeElement.classList.add('hover');

      if (event.pinch && !this.selected) {
        this.selected = true;
        window.location.href = this.href;
      }
    } else {
      this.selected = false;
      this.elmtRef.nativeElement.classList.remove('hover');
    }
  }

  onSwipe(event) {
    console.log(event);
  }
}
