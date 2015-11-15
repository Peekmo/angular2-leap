import {Component, Output, EventEmitter} from 'angular2/angular2';
import {LeapHand} from '../leap-hand/leap-hand';

declare var THREE: any;

@Component({
  selector: 'three-scene',
  templateUrl: 'app/components/three-scene/three-scene.html',
  styleUrls: ['app/components/three-scene/three-scene.css'],
  events: ['grab'],
  directives: [LeapHand]
})
export class ThreeScene {
  private scene: any;
  private camera: any;
  private renderer: any;
  private controller: any;
  @Output() grab: EventEmitter = new EventEmitter();

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById("canvas")});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;
    this.camera.rotation.x = -Math.PI * 0.5;
    this.render();
  }

  render() {
    let self = this;
    requestAnimationFrame(function() {
      self.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  onGrab(event) {
    this.grab.next(event);
  }
}
