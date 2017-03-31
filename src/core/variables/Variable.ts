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

import { ConstraintType } from '../../lib/Constants';
import { ISerializableData } from '../../lib/LocalStorage';
import { remixer } from '../Remixer';

/**
 * Interface for a class that represents a type a Variable.
 * @interface
 */
export interface IVariableParams {
  key: string;
  title: string;
  constraintType: string;
  controlType: string;
  dataType: string;
  initialValue: any;
  selectedValue: any;
  callbacks?: IVariableCallback[];
}

/**
 * Interface for a class that represents a type of Variable that can only be
 * set to predefined values.
 * @interface
 * @extends IVariableParams
 */
export interface IVariableListParams extends IVariableParams {
  limitedToValues?: any[];
}

/**
 * Interface for Function that returns a Variable.
 * @interface
 * @extends Function
 */
export interface IVariableCallback extends Function {
  variable?: Variable;
}

/**
 * Interface that maps a Variable to its key.
 * @interface
 */
export interface IVariableKeyMap {
  [key: string]: Variable;
}

/**
 * A class representing a type a Variable.
 * @class
 * @implements {IVariableParams}
 */
export class Variable implements IVariableParams {

  /**
   * Creates an instance of a Variable.
   * @param  {string}            key          A unique key for the Variable.
   * @param  {string}            dataType     The data type of this Variable.
   * @param  {any}               initialValue The initial selected value.
   * @param  {IVariableCallback} callback     The callback to invoke when updated.
   * @return {Variable}
   */
  constructor(
    key: string,
    dataType: string,
    initialValue: any,
    callback?: IVariableCallback,
  ) {
    this.key = this.sanitizeKey(key);
    this.title = key;
    this.dataType = dataType;
    this.initialValue = initialValue;
    this._selectedValue = initialValue;
    if (callback) {
      this._callbacks.push(callback);
    }
    this._initialized = true;
  }

  /**
   * Clones the variable.
   * @return {Variable} Returns the cloned variable.
   */
  clone() {
    const cloned = new Variable(
      this.key,
      this.dataType,
      this.selectedValue,
      null,
    );
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * The data constraint type for this Variable.
   * @type {string}
   * @readonly
   */
  get constraintType(): string {
    return ConstraintType.NONE;
  }

  /**
   * The rendered control type for this Variable.
   * @type {string}
   */
  controlType: string;

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
  initialValue: any;

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
    this._selectedValue = value;
    this.save();
    if (this._initialized) {
      this.executeCallbacks();
    }
  }

  protected _callbacks: IVariableCallback[] = new Array<IVariableCallback>();

  /**
   * The callback method to be invoked when the Variable is updated.
   * @return {IVariableCallback[]} The array of callback methods.
   */
  get callbacks(): IVariableCallback[] {
    return this._callbacks;
  }

  /**
   * Adds a callback to array of callbacks.
   * @param {IVariableCallback} callback The callback to add.
   */
  addCallback(callback: IVariableCallback): any {
    this._callbacks.push(callback);
  }

  /**
   * Invokes each of the callback methods.
   */
  executeCallbacks(): void {
    for (const callback of this.callbacks) {
      callback(this);
    }
  }

  /**
   * First adds a callback to array, and then immediatly executes that callback.
   * @param {IVariableCallback} callback The callback to add and execute.
   */
  addAndExecuteCallback(callback: IVariableCallback): void {
    this._callbacks.push(callback);
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
    this.selectedValue = this.initialValue;
  }

  /**
   * Returns a serialized representation of this object.
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    const data = {} as ISerializableData;
    data.key = this.key;
    data.constraintType = this.constraintType;
    data.controlType = this.controlType;
    data.dataType = this.dataType;
    data.title = this.title;
    return data;
  }

  /**
   * Subclass should override this method and return a new instance of the
   * Variable class from serialized data.
   * @param  {ISerializableData} data The serialized data.
   * @return {Variable}               A new initialized Variable subclass.
   */
  static deserialize(data: ISerializableData): Variable {
    return null;
  }

  /**
   * Formats the key by removing any whitespaces.
   * @param  {string} key The key to format
   * @return {string}     The formatted key.
   */
  private sanitizeKey(key: string): string {
    return key.split(' ').join('_');
  }

  /**
   * Subclass should override this method and return a properly formatted value.
   * For example, a ColorVariable may choose to return an rgba string when
   * provided an RgbaColor object.
   * @param  {any} value The value that should be formatted.
   * @return {any}       Return either the original or formatted value.
   */
  formatValue(value: any): any {
    return value;
  }
}
