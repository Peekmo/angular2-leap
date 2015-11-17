import {Component} from 'angular2/angular2';
import {Keyboard} from '../keyboard/keyboard';
import {LinkElement} from '../link-element/link-element';

@Component({
  selector: 'page',
  templateUrl: 'app/components/page/page.html',
  styleUrls: ['app/components/page/page.css'],
  providers: [],
  directives: [LinkElement, Keyboard],
  pipes: []
})
export class Page {
  constructor() {}
}
