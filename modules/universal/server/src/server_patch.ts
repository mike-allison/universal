
// polyfills
import 'es6-shim';
// typescript emit metadata
import 'reflect-metadata';
// zone.js to track promises
import 'zone.js/dist/zone-microtask';

// dom closure
import {Parse5DomAdapter} from 'angular2/platform/server';
Parse5DomAdapter.makeCurrent();
