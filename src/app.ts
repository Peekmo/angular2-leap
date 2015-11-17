import {provide, bootstrap} from 'angular2/angular2';
import {LeapApp} from './app/leap';
import {LeapHandService} from './app/services/leap-hand/leap-hand-service';
import {HandElement} from './app/services/hand-element/hand-element';
import {ComponentManager} from './app/services/component-manager/component-manager';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';

bootstrap(LeapApp, [
    LeapHandService,
    HandElement,
    ComponentManager,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
