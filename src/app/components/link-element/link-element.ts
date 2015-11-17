import {Component, Input, Output, EventEmitter, ElementRef, OnInit} from 'angular2/angular2';
import {HandElement} from '../../services/hand-element/hand-element';
import {ComponentManager} from '../../services/component-manager/component-manager';

@Component({
  selector: 'link-element',
  template: `
    <span>
      <a href="{{ href }}">{{ name }}</a>
    </span>
  `,
  events: ['linkSelected']
})
export class LinkElement implements OnInit {
  @Input() href: string;
  @Input() name: string;
  @Output() linkSelected: EventEmitter = new EventEmitter();
  private grabber: HandElement;
  private elmtRef: ElementRef;
  private manager: ComponentManager
  private selected: boolean = false;

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

      if (event.pinch && !this.selected) {
        this.linkSelected.next({});

        this.selected = true;
        window.location.href = this.href;
      }
    } else {
      this.selected = false;
      this.elmtRef.nativeElement.classList.remove('hover');
    }
  }

  onSwipe(event) {
  }

  onKeytap(event) {
  }
}
