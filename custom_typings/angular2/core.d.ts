declare module "angular2/src/core/application_tokens" {
  var APP_COMPONENT_REF_PROMISE:any;
  var APP_COMPONENT:any;
  var APP_ID_RANDOM_PROVIDER: any;
}

declare module "angular2/src/core/render/api" {
  import { ViewEncapsulation } from 'angular2/src/core/metadata';
  export class RenderProtoViewRef {
  }
  export class RenderFragmentRef {
  }
  export class RenderViewRef {
  }
  export abstract class RenderTemplateCmd {
    abstract visit(visitor: RenderCommandVisitor, context: any): any;
  }
  export abstract class RenderBeginCmd extends RenderTemplateCmd {
    ngContentIndex: number;
    isBound: boolean;
  }
  export abstract class RenderTextCmd extends RenderBeginCmd {
    value: string;
  }
  export abstract class RenderNgContentCmd extends RenderTemplateCmd {
    index: number;
    ngContentIndex: number;
  }
  export abstract class RenderBeginElementCmd extends RenderBeginCmd {
    name: string;
    attrNameAndValues: string[];
    eventTargetAndNames: string[];
  }
  export abstract class RenderBeginComponentCmd extends RenderBeginElementCmd {
    templateId: string;
  }
  export abstract class RenderEmbeddedTemplateCmd extends RenderBeginElementCmd {
    isMerged: boolean;
    children: RenderTemplateCmd[];
  }
  export interface RenderCommandVisitor {
    visitText(cmd: RenderTextCmd, context: any): any;
    visitNgContent(cmd: RenderNgContentCmd, context: any): any;
    visitBeginElement(cmd: RenderBeginElementCmd, context: any): any;
    visitEndElement(context: any): any;
    visitBeginComponent(cmd: RenderBeginComponentCmd, context: any): any;
    visitEndComponent(context: any): any;
    visitEmbeddedTemplate(cmd: RenderEmbeddedTemplateCmd, context: any): any;
  }
  export class RenderViewWithFragments {
    viewRef: RenderViewRef;
    fragmentRefs: RenderFragmentRef[];
    constructor(
        viewRef: RenderViewRef,
        fragmentRefs: RenderFragmentRef[]);
  }
  export interface RenderElementRef {
    renderView: RenderViewRef;
    boundElementIndex: number;
  }
  export class RenderComponentTemplate {
    id: string;
    shortId: string;
    encapsulation: ViewEncapsulation;
    commands: RenderTemplateCmd[];
    styles: string[];
    constructor(id: string, shortId: string, encapsulation: ViewEncapsulation, commands: RenderTemplateCmd[], styles: string[]);
  }
  export abstract class Renderer {
    abstract registerComponentTemplate(template: RenderComponentTemplate): any;
    abstract createProtoView(componentTemplateId: string, cmds: RenderTemplateCmd[]): RenderProtoViewRef;
    abstract createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number, hostElementSelector: string): RenderViewWithFragments;
    abstract createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments;
    abstract destroyView(viewRef: RenderViewRef): any;
    abstract attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef): any;
    abstract attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef): any;
    abstract detachFragment(fragmentRef: RenderFragmentRef): any;
    abstract hydrateView(viewRef: RenderViewRef): any;
    abstract dehydrateView(viewRef: RenderViewRef): any;
    abstract getNativeElementSync(location: RenderElementRef): any;
    abstract setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any): any;
    abstract setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string): any;
    abstract setElementClass(location: RenderElementRef, className: string, isAdd: boolean): any;
    abstract setElementStyle(location: RenderElementRef, styleName: string, styleValue: string): any;
    abstract invokeElementMethod(location: RenderElementRef, methodName: string, args: any[]): any;
    abstract setText(viewRef: RenderViewRef, textNodeIndex: number, text: string): any;
    abstract setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher): any;
  }
  export interface RenderEventDispatcher {
    dispatchRenderEvent(elementIndex: number, eventName: string, locals: Map<string, any>): boolean;
  }

}
