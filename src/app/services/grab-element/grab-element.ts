import {Injectable, ElementRef} from 'angular2/angular2';
import {LeapHandService} from '../leap-hand/leap-hand-service';

@Injectable()
export class GrabElement {
  private leapHand;

  constructor(leapHand: LeapHandService) {
    this.leapHand = leapHand;
  }

  isGrabbed(element: ElementRef) {

  }
}
