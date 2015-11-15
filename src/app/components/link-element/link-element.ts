import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/angular2';
import {GrabElement} from '../../services/grab-element/grab-element';

@Component({
  selector: 'link-element',
  templateUrl: 'app/components/link-element/link-element.html',
  events: ['register'],
  styleUrls: ['app/components/link-element/link-element.css']
})
export class LinkElement {
  @Input() href: string;
  @Input() name: string;
  @Output() register: EventEmitter = new EventEmitter();
  private grabber: GrabElement;
  private elmtRef: ElementRef;

  constructor(grabber: GrabElement, elmtRef: ElementRef) {
    this.grabber = grabber;
    this.elmtRef = elmtRef;
  }

  onInit() {
    this.register.next({element: this});
  }

  onHover() {
    if (this.grabber.isIn(this.elmtRef)) {
      this.elmtRef.nativeElement.classList.add('hover');
    } else {
      this.elmtRef.nativeElement.classList.remove('hover');
    }
  }
}
