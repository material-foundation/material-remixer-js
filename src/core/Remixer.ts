/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import { BooleanVariable } from "./variables/BooleanVariable";
import { ColorVariable } from "./variables/ColorVariable";
import { KeyCode, KeyEvent, CSS } from "../lib/Constants";
import { LocalStorage } from "../lib/LocalStorage";
import { Messaging } from "../lib/Messaging";
import { NumberVariable } from "./variables/NumberVariable";
import { RangeVariable } from "./variables/RangeVariable";
import { StringVariable } from "./variables/StringVariable";
import { Variable, VariableCallback, VariableKeyMap } from "./variables/Variable";

/**
 * The Remixer class is a singleton class that keeps track of all the Variables
 * and deals with saving/syncing its values.
 * @class
 */
class Remixer {

  /**
   * Initializes a new instance of Remixer.
   * @private
   * @static
   * @return {Remixer} A new instance of Remixer.
   */
  private static _sharedInstance = new Remixer();

  /**
   * Provides ability for Remixer HTML iFrame to access this instance of Remixer.
   * @return {Remixer} The attached instance of Remixer.
   */
  static get attachedInstance(): Remixer {
    return window.parent["remixer"]._sharedInstance as Remixer;
  }

  private _frameElement: HTMLFrameElement;

  /**
   * Returns the HTML iFrame added for this instance of Remixer.
   * @static
   * @return {HTMLFrameElement} The Remixer HTML iFrame.
   */
  static get frameElement(): HTMLFrameElement {
    return this._sharedInstance._frameElement;
  }

  /**
   * Appends an HTML iFrame to the body of client page.
   * @private
   */
  private appendFrameToBody(): void {
    if (!this._frameElement) {
      let frame = document.createElement("IFRAME") as HTMLFrameElement;
      frame.id = CSS.RMX_OVERLAY_FRAME;
      frame.setAttribute("src", "../dist/overlay.html");
      frame.setAttribute("style", "position:fixed; border:0; width:400px; height:100%; top:0; right:0; z-index:999999;");
      frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
      document.getElementsByTagName("body")[0].appendChild(frame);
      this._frameElement = frame;
    }
  }

  /**
   * Adds a key listener used to trigger the Remixer overlay.
   * @private
   */
  private addKeyListener(): void {
    document.addEventListener(KeyEvent.DOWN, (e: KeyboardEvent) => {
      if (e.keyCode === KeyCode.ESC) {
        Messaging.postToFrame(Messaging.type.ToggleVisibility);
      }
    });
  }

  /**
   * Appends the HTML iFrame to body of client app. Attaches key listener to
   * toggle Overlay visibility.
   * @static
   */
  static start(): void {
    this._sharedInstance.appendFrameToBody();
    this._sharedInstance.addKeyListener();
  }

  /**
   * Removes iFrame and attached key listener.
   * @static
   */
  static stop(): void {
    // TODO(cjcox): Remove iframe and key listeners.
  }

  /**
   * Adds a boolean Variable to array of Variables with optional callback.
   * @param  {string}               key          The key of the Variable.
   * @param  {boolean}              defaultValue The initial default value of the variable.
   * @param  {VariableCallback}     callback     The callback method to be invoked
   *                                             when the Variable is updated.
   * @return {BooleanVariable}
   */
  static addBooleanVariable(key: string, defaultValue: boolean, callback?: VariableCallback): BooleanVariable {
    let variable = new BooleanVariable(key, defaultValue, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a range Variable to array of Variables with optional callback.
   * @param  {string}             key          The key of the Variable.
   * @param  {number}             defaultValue The initial default value of the variable.
   * @param  {number}             minValue     The allowed minimum value of the variable.
   * @param  {number}             maxValue     The allowed maximum value of the variable.
   * @param  {number}             increment    The amount to increment the value.
   * @param  {VariableCallback}   callback     The callback method to be invoked
   *                                           when the Variable is updated.
   * @return {RangeVariable}
   */
  static addRangeVariable(key: string, defaultValue: number, minValue: number, maxValue: number, increment: number, callback?: VariableCallback): RangeVariable {
    let variable = new RangeVariable(key, defaultValue, minValue, maxValue, increment, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a string Variable to array of variables with optional callback
   * @param  {string}              key            The key of the Variable.
   * @param  {string}              defaultValue   The initial default value of the variable.
   * @param  {Array<string>}       possibleValues The optional array of available items for the variable.
   * @param  {VariableCallback}    callback       The callback method to be invoked
   *                                              when the Variable is updated.
   * @return {StringVariable}
   */
  static addStringVariable(key: string, defaultValue: string, possibleValues?: Array<string>, callback?: VariableCallback): StringVariable {
    let variable = new StringVariable(key, defaultValue, possibleValues, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a number variable to array of variables with optional callback.
   * @param  {string}              key            The key of the Variable.
   * @param  {number}              defaultValue   The initial default value of the variable.
   * @param  {Array<number>}       possibleValues The optional array of available items for the variable.
   * @param  {VariableCallback}    callback       The callback method to be invoked
   *                                              when the Variable is updated.
   * @return {NumberVariable}
   */
  static addNumberVariable(key: string, defaultValue: number, possibleValues?: Array<number>, callback?: VariableCallback): NumberVariable {
    let variable = new NumberVariable(key, defaultValue, possibleValues, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a color variable to array of variables with optional callback.
   * @param  {string}             key            The key of the Variable.
   * @param  {string}             defaultValue   The initial default value of the variable.
   * @param  {Array<string>}      possibleValues The optional array of available items for the variable.
   * @param  {VariableCallback}   callback       The callback method to be invoked
   *                                             when the Variable is updated.
   * @return {ColorVariable}
   */
  static addColorVariable(key: string, defaultValue: string, possibleValues?: Array<string>, callback?: VariableCallback): ColorVariable {
    let variable = new ColorVariable(key, defaultValue, possibleValues, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a variable to the array of variables. Once added, will save and
   * execute the callback.
   * @private
   * @static
   * @param {Variable} variable The variable to add.
   */
  private static addVariable(variable: Variable): void {
    let key: string = variable.key;
    let existingVariable = this.getVariable(key);
    if (existingVariable) {
      // Variable with key already exists, so only add callback.
      // TODO(cjcox:) Determin what to do if variable key already exists.
    } else {
      this._sharedInstance._variables[key] = variable;
      let storedVariable = LocalStorage.getVariable(key);
      if (storedVariable) {
        // Update variable if exists in storage.
        this.updateVariable(variable, storedVariable.selectedValue);
      } else {
        // Save variable first time.
        this.saveVariable(variable);
        variable.executeCallbacks();
      }
    }
  }

  private _variables: VariableKeyMap = {};

  /**
   * Returns the Variable-Key mapping from the Remixer shared instance.
   * @return {VariableKeyMap}
   */
  get variables(): VariableKeyMap {
    return this._variables;
  }

  /**
   * Returns an array of Variables from the Remixer shared instance.
   * @return {Array<Variable>} Array of Variables.
   */
  get variablesArray(): Array<Variable> {
    return Object.keys(this._variables).map(key => this._variables[key]);
  }

  /**
   * Returns an Variable for a given key from the Remixer shared instance.
   * @static
   * @return {Array<Variable>} Array of Variables.
   */
  static getVariable(key: string): Variable {
    return this._sharedInstance._variables[key];
  }

  /**
   * Updates the selected value of a given Variable from the Remixer shared instance.
   * @static
   * @param {Variable} variable      The Variable to update.
   * @param {any}      selectedValue The new selected value.
   */
  static updateVariable(variable: Variable, selectedValue: any): void {
    variable.selectedValue = selectedValue;
  }

  /**
   * Saves the Variable to local storage.
   * @param {Variable} variable The Variable to save.
   */
  static saveVariable(variable: Variable): void {
    LocalStorage.saveVariable(variable);
  }
}

// Export Remixer.
export { Remixer as remixer };
