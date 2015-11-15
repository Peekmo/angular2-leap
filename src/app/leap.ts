import {Component, bootstrap} from 'angular2/angular2';
import {ThreeScene} from './components/three-scene/three-scene';
import {LinkElement} from './components/link-element/link-element';

@Component({
  selector: 'leap-app',
  providers: [],
  templateUrl: 'app/leap.html',
  directives: [ThreeScene, LinkElement],
  pipes: [],
  styleUrls: ['app/leap.css']
})
export class LeapApp {
  private elements;

  constructor() {
    this.elements = new Array();
  }

  registerElement(event) {
    this.elements.push(event.element);
  }

  onGrab(event) {
    this.elements.forEach(function(elmt) {
      elmt.onGrab();
    });
  }
}
