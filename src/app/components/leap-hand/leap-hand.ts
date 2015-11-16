import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/angular2';
import {LeapHandService} from '../../services/leap-hand/leap-hand-service';

declare var THREE: any;
declare var Leap: any;

@Component({
  selector: 'leap-hand',
  events: ['movehand', 'swipehand'],
  template: ''
})
export class LeapHand implements OnInit {
  @Input() scene: any;
  @Input() renderer: any;
  @Input() camera: any;
  @Output() movehand: EventEmitter = new EventEmitter();
  @Output() swipehand: EventEmitter = new EventEmitter();

  private controller: any;
  private swiper: any;
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

          self.movehand.next({pinch: hand.pinchStrength >= 0.9});
        } else if (self.leapHandService.hand) {
          self.leapHandService.hand = null;
          self.movehand.next({pinch: false});
        }
      })
      .on('riggedHand.meshAdded', function(handMesh, leapHand){
        handMesh.name= "hand";
      })
      .connect()
    ;

    this.swiper = this.controller.gesture('swipe');
    this.swiper.update(function(g) {
      if (Math.abs(g.translation()[0]) > 100) {
        if (g.translation()[0] > 0) {
          self.swipehand.next({direction: 'left'});
        } else {
          self.swipehand.next({direction: 'right'});
        }
      }

      if (Math.abs(g.translation()[1]) > 100) {
        if (g.translation()[1] > 0) {
           // The down is harder to do 
          self.swipehand.next({direction: 'down'});
        } else {
          self.swipehand.next({direction: 'up'});
        }
      }
    });
  }
}
