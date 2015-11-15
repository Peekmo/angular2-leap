import {Component, Input} from 'angular2/angular2';


@Component({
  selector: 'link-element',
  templateUrl: 'app/components/link-element/link-element.html',
  styleUrls: ['app/components/link-element/link-element.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class LinkElement {
  @Input() href: string;
  @Input() name: string;

  constructor() {}
}
