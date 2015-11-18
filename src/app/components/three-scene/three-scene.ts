import {Component, Output, EventEmitter} from 'angular2/angular2';
import {LeapHand} from '../leap-hand/leap-hand';
import {ComponentManager} from '../../services/component-manager/component-manager';

declare var THREE: any;

@Component({
  selector: 'three-scene',
  template: `
    <canvas id="canvas"></canvas>
    <leap-hand
      [scene]="scene"
      [renderer]="renderer"
      [camera]="camera"
      (movehand)="onMoveHand($event)"
      (swipehand)="onSwipeHand($event)"
      (keytaphand)="onKeyTap($event)"
    ></leap-hand>
  `,
  styles: [`
    #canvas {
      position: fixed;
      top: 0;
      z-index: 100;
    }
  `],
  directives: [LeapHand]
})
export class ThreeScene {
  private scene: any;
  private camera: any;
  private renderer: any;
  private controller: any;
  private manager: ComponentManager;

  private timers = {
    movehand: false,
    swipehand: false,
    keytaphand: false
  };

  constructor(manager: ComponentManager) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById("canvas")});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.manager = manager;
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
