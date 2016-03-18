/**
 * @fileoverview This is a customized nsRouterLink.
 * This routerLink could resolve a function first and
 * then do the navigation. It can also be used as a 
 * normal nsRouterLink.
 *
 * To use this routerLink, pleace put your function as 
 * the last parameter in the list or use it.
 * 
 * exp. 
 * 
 * onTest() {
 *   alert("alert");
 * }
 *
 * <Button text="TextSignup" [wasabiRouterLink]="[testVal, onTest]"></Button>
 *
 * or as usual
 * <Button text="TextSignup" [wasabiRouterLink]="[testVal, onTest]"></Button>
 */

import {Directive} from 'angular2/core';
import {Router, Location, Instruction} from 'angular2/router';

@Directive({
    selector: '[wasabiRouterLink]',
    inputs: ['params: wasabiRouterLink'],
    host: {
        '(tap)': 'onTap()'
    }
})

export class WasabiRouterLink {
  private _routeParams: any[];
  private _preFunction: any;
  private _navigationInstruction: Instruction;

  constructor(private _router: Router, private _location: Location) { }
  
  /**
   * This function initializes attributes.
   * You probably don't need to touch this method.
   * If the last element is detected as a function,
   * _preFunction is initialized.
   * @param {any[]} changes - inputs value, don't 
   * worry about it.
   */
  set params(changes: any[]) {
    if(typeof(changes[changes.length-1]) === "function") {
      this._preFunction = changes.pop();
    }
    this._routeParams = changes;
    this._navigationInstruction = this._router.generate(this._routeParams);
  }
  
  /**
   * onTap function will check _preFunction first 
   * then do the navigation.
   */
  onTap(): void {
    if(this._preFunction) {
      Promise.resolve(this._preFunction()).then((res) => {
        this._router.navigateByInstruction(this._navigationInstruction);
      });
    } else {
      this._router.navigateByInstruction(this._navigationInstruction);
    }
  }
}
