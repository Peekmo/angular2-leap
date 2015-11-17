import {Component, bootstrap} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';
import {Page} from './components/page/page';
import {ThreeScene} from './components/three-scene/three-scene';

@Component({
  selector: 'leap-app',
  templateUrl: 'app/leap.html',
  styleUrls: ['app/leap.css'],
  directives: [RouterOutlet, ThreeScene]
})
@RouteConfig([
  {path: '/home', as: 'Home', component: Page}
])
export class LeapApp {
  constructor(router: Router) {
    router.navigate(['/Home']);
  }
}
