import {bootstrap} from 'angular2/angular2';
import {LeapApp} from './app/leap';
import {LeapHandService} from './app/services/leap-hand/leap-hand-service';
import {GrabElement} from './app/services/grab-element/grab-element';

bootstrap(LeapApp, [LeapHandService, GrabElement]);
