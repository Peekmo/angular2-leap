import {Injectable} from 'angular2/angular2';

@Injectable()
export class ComponentManager {
  public components: Array<any>;

  constructor() {
    this.components = new Array();
  }

  register(component) {
    this.components.push(component);
  }
}
