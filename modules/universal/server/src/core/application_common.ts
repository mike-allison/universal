import {
  provide,
  Provider,
  Type,
  FORM_PROVIDERS
} from 'angular2/angular2';
import {
    DOCUMENT,
    DOM,
    DomEventsPlugin,
    DomRenderer,
    DomSharedStylesHost,
    EventManager,
    EVENT_MANAGER_PLUGINS,
    SharedStylesHost
} from 'angular2/platform/common_dom';
import {Promise} from 'angular2/src/facade/async';
import {Parse5DomAdapter} from 'angular2/platform/server';
import {
    Renderer,
    ComponentRef,
    DirectiveResolver
} from 'angular2/core';
import {KeyEventsPlugin} from 'angular2/src/platform/dom/events/key_events';
import {HammerGesturesPlugin} from 'angular2/src/platform/dom/events/hammer_gestures';
import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {XHR} from 'angular2/compiler';
import {XHRImpl} from 'angular2/src/platform/browser/xhr_impl';
import {Testability} from 'angular2/src/core/testability/testability';
import {AnimationBuilder, BrowserDetails} from 'angular2/animate';
import {ServerDomRenderer_} from '../render/server_dom_renderer';
import {EXCEPTION_PROVIDERS} from './platform_providers';
import {
  platformCommon,
  PlatformRef,
  applicationCommonProviders
} from './application_ref';
import {createServerDocument} from '../render';


export function platform(providers?: Array<Type | Provider | any[]>): PlatformRef {
  return platformCommon(providers, () => {
    Parse5DomAdapter.makeCurrent();
  });
}

export function applicationServerDomProviders(appComponentType): Array<Type | Provider | any[]> {
  if (isBlank(DOM)) {
    throw 'Must set a root DOM adapter first.';
  }

  return [
    provide(DOCUMENT, {
      useFactory: (directiveResolver) => {
        let selector = directiveResolver.resolve(appComponentType).selector;
        let serverDocument = DOM.createHtmlDocument();
        let el = DOM.createElement(selector, serverDocument);
        DOM.appendChild(serverDocument.body, el);
        return serverDocument;
      },
      deps: [DirectiveResolver]
    }),
    // provide(DOCUMENT, {useValue: DOM.defaultDoc()}),

    EventManager,
    provide(EVENT_MANAGER_PLUGINS, {multi: true, useClass: DomEventsPlugin}),
    provide(EVENT_MANAGER_PLUGINS, {multi: true, useClass: KeyEventsPlugin}),
    provide(EVENT_MANAGER_PLUGINS, {multi: true, useClass: HammerGesturesPlugin}),

    provide(DomRenderer, {useClass: ServerDomRenderer_}),
    // provide(DomRenderer, {useClass: DomRenderer_}),
    provide(Renderer, {useExisting: DomRenderer}),

    DomSharedStylesHost,
    provide(SharedStylesHost, {useExisting: DomSharedStylesHost}),

    EXCEPTION_PROVIDERS,
    provide(XHR, {useValue: new XHRImpl()}),
    Testability,
    BrowserDetails,
    AnimationBuilder,
    FORM_PROVIDERS
  ];
}


export function serverBootstrap(appComponentType: /*Type*/ any,
                                appProviders: Array<Type | Provider | any[]> = null):
    Promise<ComponentRef> {
  let p = platform();

  let providers: Array<any> = [
    applicationCommonProviders(),
    applicationServerDomProviders(appComponentType)
  ];

  if (isPresent(appProviders)) {
    providers.push(appProviders);
  }

  return p.application(providers).bootstrap(appComponentType);
}
