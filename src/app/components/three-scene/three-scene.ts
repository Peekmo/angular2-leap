import {Component} from 'angular2/angular2';

declare var THREE: any;
declare var Leap: any;

@Component({
  selector: 'three-scene',
  templateUrl: 'app/components/three-scene/three-scene.html',
  styleUrls: ['app/components/three-scene/three-scene.css']
})
export class ThreeScene {
  private scene: any;
  private camera: any;
  private renderer: any;
  private controller: any;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById("canvas")});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;
    this.camera.rotation.x = -Math.PI * 0.5;
    this.render();
    this.init();
  }

  render() {
    let self = this;
    requestAnimationFrame(function() {
      self.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  init() {
    let self = this;
    this.controller = new Leap.Controller({
      enableGestures: true
    });

    this.controller
      .use("handHold")
      .use("handEntry")
      .use("screenPosition")
      .use("transform", {
        position: new THREE.Vector3(0, 0, 0)
      })
      .use("riggedHand", {
        parent: this.scene,
        renderer: this.renderer,
        renderFn: function() {
        },
        camera: this.camera,
        scale: 0.05,
        positionScale: 0.8,
        checkWebGL: true
      })
      .loop(function(frame) {
        if (frame.hands[0]) {
          let hand = frame.hands[0];
          var children = self.scene.children;

          for (var i = 0; i < children.length; i++) {
              if (children[i].name === "hand") {
                var tmpHandY = children[i].position.y;
                children[i].position.y = -70;
                children[i].position.z = -tmpHandY;
              }
          }

          return null;
        }
      })
      .on('riggedHand.meshAdded', function(handMesh, leapHand){
        handMesh.name= "hand";
      })
      .connect()
    ;
  }
}
