import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/angular2';
import {LeapHandService} from '../../services/leap-hand/leap-hand-service';

declare var THREE: any;
declare var Leap: any;

@Component({
  selector: 'leap-hand',
  events: ['movehand'],
  template: ''
})
export class LeapHand implements OnInit {
  @Input() scene: any;
  @Input() renderer: any;
  @Input() camera: any;
  @Output() movehand: EventEmitter = new EventEmitter();

  private controller: any;
  private leapHandService: LeapHandService;

  constructor(leapHandService: LeapHandService) {
    this.leapHandService = leapHandService;
  }

  onInit() {
    this.leapHandService.camera = this.camera;
    this.leapHandService.renderer = this.renderer;

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
        parent: self.scene,
        renderer: self.renderer,
        renderFn: function() {
        },
        camera: self.camera,
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

              self.leapHandService.hand = children[i];
              break;
            }
          }

          self.movehand.next({});
        } else {
          self.leapHandService.hand = null;
        }
      })
      .on('riggedHand.meshAdded', function(handMesh, leapHand){
        handMesh.name= "hand";
      })
      .connect()
    ;
  }
}
