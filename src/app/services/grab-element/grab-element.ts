import {Injectable, ElementRef} from 'angular2/angular2';
import {LeapHandService} from '../leap-hand/leap-hand-service';

@Injectable()
export class GrabElement {
  private leapHand: LeapHandService;

  constructor(leapHand: LeapHandService) {
    this.leapHand = leapHand;
  }

  isIn(element: ElementRef) {
    if (!this.leapHand.hasHand()) {
      return false;
    }

    let positions = {
      x: element.nativeElement.offsetLeft,
      y: element.nativeElement.offsetTop
    };

    let handPositions = this.leapHand.getHandScreenPosition();

    if (
      handPositions.x >= positions.x &&
      handPositions.x <= (positions.x + element.nativeElement.offsetWidth) &&
      handPositions.y >= positions.y &&
      handPositions.y <= (positions.y + element.nativeElement.offsetHeight)
    ) {
      return true;
    }

    return false;
  }
}
