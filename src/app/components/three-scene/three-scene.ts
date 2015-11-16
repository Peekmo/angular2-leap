import {Component, Output, EventEmitter} from 'angular2/angular2';
import {LeapHand} from '../leap-hand/leap-hand';

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
  events: ['movehand', 'swipehand'],
  directives: [LeapHand]
})
export class ThreeScene {
  private scene: any;
  private camera: any;
  private renderer: any;
  private controller: any;
  @Output() movehand: EventEmitter = new EventEmitter();
  @Output() swipehand: EventEmitter = new EventEmitter();
  @Output() keytaphand: EventEmitter = new EventEmitter();

  private timers = {
    movehand: false,
    swipehand: false,
    keytaphand: false
  };

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

  onMoveHand(event) {
    if (!this.timers.movehand) {
      this.timers.movehand = true;
      this.movehand.next(event);

      setTimeout(() => {
        this.timers.movehand = false;
      }, 100);
    }
  }

  onSwipeHand(event) {
    if (!this.timers.swipehand) {
      this.timers.swipehand = true;
      this.swipehand.next(event);

      setTimeout(() => {
        this.timers.swipehand = false;
      }, 100);
    }
  }

  onKeyTap(event) {
    console.log(event);
    if (!this.timers.keytaphand) {
      this.timers.keytaphand = true;
      this.keytaphand.next(event);

      setTimeout(() => {
        this.timers.keytaphand = false;
      }, 100);
    }
  }
}
