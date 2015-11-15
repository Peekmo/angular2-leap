import {Component, bootstrap} from 'angular2/angular2';
import {ThreeScene} from './components/three-scene/three-scene';
import {LinkElement} from './components/link-element/link-element';

@Component({
  selector: 'leap-app',
  providers: [],
  templateUrl: 'app/leap.html',
  directives: [ThreeScene, LinkElement],
  pipes: []
})
export class LeapApp {

  constructor() {}

}
