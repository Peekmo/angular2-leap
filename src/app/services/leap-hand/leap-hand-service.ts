import {Injectable} from 'angular2/angular2';

declare var THREE: any;

@Injectable()
export class LeapHandService {
  public hand;
  public camera;
  public renderer;

  constructor() {
    this.hand = null;
  }

  hasHand() {
    return this.hand !== null;
  }

  getHandScreenPosition() {
    var vector = new THREE.Vector3();

    var widthHalf = 0.5 * this.renderer.context.canvas.width;
    var heightHalf = 0.5 * this.renderer.context.canvas.height;

    this.hand.updateMatrixWorld();
    vector.setFromMatrixPosition(this.hand.matrixWorld);
    vector.project(this.camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };
  }
}
