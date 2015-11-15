import {Injectable} from 'angular2/angular2';


@Injectable()
export class LeapHandService {
  public hand;

  constructor() {
    this.hand = null;
  }

  hasHand() {
    return this.hand !== null;
  }
}
