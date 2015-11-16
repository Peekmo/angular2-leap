import {Component, bootstrap} from 'angular2/angular2';
import {ThreeScene} from './components/three-scene/three-scene';
import {LinkElement} from './components/link-element/link-element';
import {ComponentManager} from './services/component-manager/component-manager';

@Component({
  selector: 'leap-app',
  templateUrl: 'app/leap.html',
  directives: [ThreeScene, LinkElement],
  styleUrls: ['app/leap.css']
})
export class LeapApp {
  private manager: ComponentManager;

  constructor(manager: ComponentManager) {
    this.manager = manager;
  }

  onMoveHand(event) {
    this.manager.components.forEach(function(elmt) {
      elmt.onHover(event);
    });
  }

  onSwipeHand(event) {
    this.manager.components.forEach(function(elmt) {
      elmt.onSwipe(event);
    });
  }

  onKeyTap(event) {
    this.manager.components.forEach(function(elmt) {
      elmt.onKeytap(event);
    });
  }
}
