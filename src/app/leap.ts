import {Component, bootstrap} from 'angular2/angular2';
import {ThreeScene} from './components/three-scene/three-scene';

@Component({
  selector: 'leap-app',
  providers: [],
  templateUrl: 'app/leap.html',
  directives: [ThreeScene],
  pipes: []
})
export class LeapApp {

  constructor() {}

}
