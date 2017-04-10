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

import { CSS, KeyCode, KeyEvent } from '../lib/Constants';
import { LocalStorage } from '../lib/LocalStorage';
import { Messaging } from '../lib/Messaging';
import { Remote } from '../lib/Remote';
import { BooleanVariable } from './variables/BooleanVariable';
import { ColorVariable } from './variables/ColorVariable';
import { NumberVariable } from './variables/NumberVariable';
import { IRangeVariableParams, RangeVariable } from './variables/RangeVariable';
import { StringVariable } from './variables/StringVariable';
import { IVariableCallback, IVariableKeyMap, Variable } from './variables/Variable';

import '../ui/styles/iframe.less';

/**
 * A declaration used for the webpack `html-loader` module to load string
 * content from a given path.
 * @param  {string} path The url path of string to content to load.
 * @return {string}      Returns the string at given path.
 */
declare function require(path: string): string;

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
    const parentRemixer = window.parent['remixer'];
    if (parentRemixer) {
      return parentRemixer._sharedInstance as Remixer;
    }
    // Simply return shared remixer instance if no parent.
    return this._sharedInstance;
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
      const frame = document.createElement('IFRAME') as HTMLFrameElement;
      frame.id = CSS.RMX_OVERLAY_FRAME;
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
      document.getElementsByTagName('body')[0].appendChild(frame);

      // Until `srcdoc` is fully compatible with all browsers, lets simply
      // write the overlay html content to the iframe content window.
      const iframeContent: string = require('../ui/templates/overlay_iframe.html');
      frame.contentWindow.document.open();
      frame.contentWindow.document.write(iframeContent);
      frame.contentWindow.document.close();
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
   * @param {{}} remoteConfig The optional firebase configuration. Provide this
   *                          configuration if you wish to use the remote
   *                          controller.
   */
  static start(remoteConfig: {} = {}): void {
    this._sharedInstance.appendFrameToBody();
    this._sharedInstance.addKeyListener();
    Remote.initializeRemote(remoteConfig);
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
   * @param  {string}            key          The key of the Variable.
   * @param  {boolean}           defaultValue The initial default value of the variable.
   * @param  {IVariableCallback} callback     The callback method to be invoked
   *                                          when the Variable is updated.
   * @return {BooleanVariable}
   */
  static addBooleanVariable(
    key: string,
    defaultValue: boolean,
    callback?: IVariableCallback,
  ): BooleanVariable {
    const variable = new BooleanVariable(key, defaultValue, callback);
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
   * @param  {IVariableCallback}  callback     The callback method to be invoked
   *                                           when the Variable is updated.
   * @return {RangeVariable}
   */
  static addRangeVariable(
    key: string,
    defaultValue: number,
    minValue: number,
    maxValue: number,
    increment: number,
    callback?: IVariableCallback,
  ): RangeVariable {
    const variable = new RangeVariable(key, defaultValue, minValue, maxValue, increment, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a string Variable to array of variables with optional callback
   * @param  {string}              key             The key of the Variable.
   * @param  {string}              defaultValue    The initial default value of the variable.
   * @param  {string[]}            limitedToValues The optional array of allowed values.
   * @param  {IVariableCallback}   callback        The callback method to be invoked
   *                                               when the Variable is updated.
   * @return {StringVariable}
   */
  static addStringVariable(
    key: string,
    defaultValue: string,
    limitedToValues?: string[],
    callback?: IVariableCallback,
  ): StringVariable {
    const variable = new StringVariable(key, defaultValue, limitedToValues, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a number variable to array of variables with optional callback.
   * @param  {string}              key             The key of the Variable.
   * @param  {number}              defaultValue    The initial default value of the variable.
   * @param  {number[]}            limitedToValues The optional array of allowed values.
   * @param  {IVariableCallback}   callback        The callback method to be invoked
   *                                               when the Variable is updated.
   * @return {NumberVariable}
   */
  static addNumberVariable(
    key: string,
    defaultValue: number,
    limitedToValues?: number[],
    callback?: IVariableCallback,
  ): NumberVariable {
    const variable = new NumberVariable(key, defaultValue, limitedToValues, callback);
    this.addVariable(variable);
    return variable;
  }

  /**
   * Adds a color variable to array of variables with optional callback.
   * @param  {string}              key             The key of the Variable.
   * @param  {string}              defaultValue    The initial default value of the variable.
   * @param  {string[]}            limitedToValues The optional array of allowed values.
   * @param  {IVariableCallback}   callback        The callback method to be invoked
   *                                               when the Variable is updated.
   * @return {ColorVariable}
   */
  static addColorVariable(
    key: string,
    defaultValue: string,
    limitedToValues?: string[],
    callback?: IVariableCallback,
  ): ColorVariable {
    const variable = new ColorVariable(key, defaultValue, limitedToValues, callback);
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
    const key: string = variable.key;
    const existingVariable = this.getVariable(key);
    if (existingVariable) {
      // Variable with key already exists, so only add callback.
      // TODO(cjcox:) Determine what to do if variable key already exists.
    } else {
      this._sharedInstance._variables[key] = variable;
      const storedVariable = LocalStorage.getVariable(key);
      if (storedVariable) {
        // Update variable if exists in storage.
        this.updateVariable(variable, storedVariable.selectedValue);
        Remote.saveVariable(variable, false);
      } else {
        // Save variable first time.
        this.saveVariable(variable);
        variable.executeCallbacks();
      }
    }
  }

  private _variables: IVariableKeyMap = {};

  /**
   * Returns the Variable-Key mapping from the Remixer shared instance.
   * @return {IVariableKeyMap}
   */
  get variables(): IVariableKeyMap {
    return this._variables;
  }

  /**
   * Returns an array of Variables from the Remixer shared instance.
   * @return {Variable[]} Array of Variables.
   */
  get variablesArray(): Variable[] {
    return Object.keys(this._variables).map((key) => this._variables[key]);
  }

  /**
   * Returns an Variable for a given key from the Remixer shared instance.
   * @static
   * @return {Variable[]} Array of Variables.
   */
  static getVariable(key: string): Variable {
    return this._sharedInstance._variables[key];
  }

  /**
   * Updates the selected value of a given Variable from the Remixer shared
   * instance.
   * @static
   * @param {Variable} variable      The Variable to update.
   * @param {any}      selectedValue The new selected value.
   */
  static updateVariable(variable: Variable, selectedValue: any): void {
    if (variable.selectedValue !== selectedValue) {
      variable.selectedValue = selectedValue;
    }
  }

  /**
   * Clones and updates the selected value of a given Variable from the Remixer
   * shared instance. Allows immutability update required for React rendering.
   * @static
   * @param {Variable} variable The variable to clone and update.
   * @param {any} selectedValue The new selected value.
   * @return {Variable} The cloned variable with updated selected value.
   */
  static cloneAndUpdateVariable(variable: Variable, selectedValue: any): Variable {
    // First make sure selected value is in proper format.
    selectedValue = variable.formatValue(selectedValue);

    if (variable.selectedValue === selectedValue) {
      return variable;
    }

    const clonedVariable = variable.clone();
    this.attachedInstance._variables[variable.key] = clonedVariable;
    this.updateVariable(clonedVariable, selectedValue);
    return clonedVariable;
  }

  /**
   * Saves the Variable to both local storage and remote.
   * @static
   * @param {Variable} variable The Variable to save.
   */
  static saveVariable(variable: Variable): void {
    LocalStorage.saveVariable(variable);

    // Save remotely. If remote sharing is disabled, a call to this method
    // will simply be a no-op.
    Remote.saveVariable(variable);
  }

  /**
   * Returns the current remote controller class.
   * @return {Remote}
   */
  get remote(): Remote {
    return Remote.attachedInstance;
  }
}

// Export Remixer.
export { Remixer as remixer };
