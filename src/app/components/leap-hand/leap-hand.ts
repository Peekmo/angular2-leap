import {Component, Input, OnInit} from 'angular2/angular2';

declare var THREE: any;
declare var Leap: any;

@Component({
  selector: 'leap-hand',
  template: ''
})
export class LeapHand implements OnInit {
  @Input() scene: any;
  @Input() renderer: any;
  @Input() camera: any;

  private controller: any;

  onInit() {
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
