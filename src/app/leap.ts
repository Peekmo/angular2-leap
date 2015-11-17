import {Component, bootstrap} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {ThreeScene} from './components/three-scene/three-scene';
import {Keyboard} from './components/keyboard/keyboard';
import {LinkElement} from './components/link-element/link-element';

@Component({
  selector: 'leap-app',
  templateUrl: 'app/leap.html',
  directives: [ThreeScene, LinkElement, Keyboard],
  styleUrls: ['app/leap.css']
})
@RouteConfig([
  {path: '/test', as: 'home', component: LeapApp}
])
export class LeapApp {
  constructor() {
  }
}
