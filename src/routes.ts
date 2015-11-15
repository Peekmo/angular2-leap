import { RouteDefinition } from 'angular2/router';
import {LeapApp} from './app/leap';

export var Routes = {
  home: {
    path: '/',
    component: LeapApp,
    as: 'Home'
  }
};

export const APP_ROUTES: RouteDefinition[] = Object.keys(Routes).map((route) => Routes[route]);
