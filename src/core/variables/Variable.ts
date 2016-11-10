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

import { SerializableData } from "../../lib/LocalStorage";
import { remixer } from "../Remixer";

/**
 * Interface for a class that represents a type a Variable.
 * @interface
 */
export interface VariableParams {
  key: string;
  title: string;
  dataType: string;
  defaultValue: any;
  selectedValue: any;
  callbacks?: Array<VariableCallback>;
}

/**
 * Interface for a class that represents a type a Variable with possible values.
 * @interface
 * @extends VariableParams
 */
export interface VariableListParams extends VariableParams {
  possibleValues?: Array<any>;
}

/**
 * Interface for Function that returns a Variable.
 * @interface
 * @extends Function
 */
export interface VariableCallback extends Function {
  variable: Variable;
}

/**
 * Interface that maps a Variable to its key.
 * @interface
 */
export interface VariableKeyMap {
  [key: string]: Variable;
}

/**
 * A class representing a type a Variable.
 * @class
 * @implements {VariableParams}
 */
export class Variable implements VariableParams {

  /**
   * Creates an instance of a Variable.
   * @param  {string}           key          A unique key for the Variable.
   * @param  {string}           dataType     The data type of this Variable.
   * @param  {any}              defaultValue The default value.
   * @param  {VariableCallback} callback     The callback to invoke when updated.
   * @return {Variable}
   */
  constructor(key: string, dataType: string, defaultValue: any, callback?: VariableCallback) {
    this.key = this.sanitizeKey(key);
    this.title = key;
    this.dataType = dataType;
    this.defaultValue = defaultValue;
    this._selectedValue = defaultValue;
    if (callback) {
      this.callbacks.push(callback);
    }
    this._initialized = true;
  }

  /**
   * The data type represented by this Variable.
   * @type {string}
   */
  dataType: string;

  /**
   * The unique key for this Variable.
   * @type {string}
   */
  key: string;

  /**
   * The title for this Variable.
   * @type {string}
   */
  title: string;

  /**
   * The defalut value for this Variable.
   * @type {any}
   */
  defaultValue: any;

  /**
   * Whether this Variable has been initialized.
   * @private
   * @type {boolean}
   */
  private _initialized: boolean = false;

  private _selectedValue: any;

  /**
   * The selected value.
   * @return {any} Returns the selected value.
   */
  get selectedValue(): any {
    return this._selectedValue;
  }

  set selectedValue(value: any) {
    // TODO(cjcox): For cloud mode, determine when to save to avoid multiple
    // calls when using slider, etc.
    this._selectedValue = value;
    this.save();
    if (this._initialized) {
      this.executeCallbacks();
    }
  }

  private _callbacks: Array<VariableCallback> = new Array<VariableCallback>();

  /**
   * The callback method to be invoked when the Variable is updated.
   * @return {Array<VariableCallback>} The array of callback methods.
   */
  get callbacks(): Array<VariableCallback> {
    return this._callbacks;
  }

  /**
   * Invokes each of the callback methods.
   */
  executeCallbacks(): void {
    for (let callback of this.callbacks) {
      callback(this);
    }
  }

  /**
   * First adds a callback to array, and then immediatly executes that callback.
   * @param {VariableCallback} callback The callback to add and execute.
   */
  addAndExecuteCallback(callback: VariableCallback): void {
    this.callbacks.push(callback);
    callback(this);
  }

  /**
   * Saves the Variable.
   */
  save(): void {
    remixer.saveVariable(this);
  }

  /**
   * Restores the Variable to its default value.
   */
  restore(): void {
    this.selectedValue = this.defaultValue;
  }

  /**
   * Returns a serialized representation of this object.
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = <SerializableData>{};
    data.key = this.key;
    data.dataType = this.dataType;
    data.title = this.title;
    return data;
  }

  /**
   * Subclass should override this method and return a new instance of thei
   * Variable class from serialized data.
   * @param  {SerializableData} data The serialized data.
   * @return {Variable}        A new initialized Variable subclass.
   */
  static deserialize(data: SerializableData): Variable {
    return null;
  }

  /**
   * Formats the key by removing any whitespaces.
   * @param  {string} key The key to format
   * @return {string}     The formatted key.
   */
  private sanitizeKey(key: string): string {
    return key.split(" ").join("_");
  }
}
