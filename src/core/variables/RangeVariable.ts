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

import { ConstraintType, ControlType, DataType } from "../../lib/Constants";
import { ISerializableData } from "../../lib/LocalStorage";
import { IVariableCallback, IVariableParams, Variable } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for a range
 * of values.
 * @interface
 * @extends IVariableParams
 */
export interface IRangeVariableParams extends IVariableParams {
  defaultValue: number;
  selectedValue: number;
  minValue: number;
  maxValue: number;
  increment: number;
  callback?: IVariableCallback;
}

/**
 * A class representing a type of Variable for a range of values.
 * @class
 * @extends Variable
 * @implements {IRangeVariableParams}
 */
export class RangeVariable extends Variable implements IRangeVariableParams {

  /**
   * Creates an instance of a RangeVariable.
   * @constructor
   * @param  {string}            key          A unique key for the Variable.
   * @param  {number}            defaultValue The default value.
   * @param  {number}            minValue     The minimum value allowed.
   * @param  {number}            maxValue     The maximum value allowed.
   * @param  {IVariableCallback} callback     The callback to invoke when updated.
   * @return {RangeVariable}
   */
  constructor(
    key: string,
    defaultValue: number,
    minValue: number,
    maxValue: number,
    increment: number,
    callback?: IVariableCallback,
  ) {
    super(key, DataType.NUMBER, defaultValue, callback);
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.increment = increment;
  }

  /**
   * The data constraint type for this Variable.
   * @type {string}
   * @readonly
   */
  get constraintType(): string {
    return ConstraintType.RANGE;
  }

  /**
   * The rendered control type for this Variable.
   * @type {string}
   * @readonly
   */
  get controlType(): string {
    return ControlType.SLIDER;
  }

  /**
   * Clones the variable.
   * @return {RangeVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new RangeVariable(
      this.key,
      this.defaultValue,
      this.minValue,
      this.maxValue,
      this.increment,
    );
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * The minimum value allowed for this Variable.
   * @override
   * @type {number}
   */
  minValue: number;

  /**
   * The maximum value allowed for this Variable.
   * @override
   * @type {number}
   */
  maxValue: number;

  /**
   * The increment value for this Variable.
   * @override
   * @type {number}
   */
  increment: number;

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue.toString();
    data.minValue = this.minValue;
    data.maxValue = this.maxValue;
    data.increment = this.increment;
    return data;
  }

  /**
   * Returns a new initialized RangeVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {RangeVariable}          A new initialized RangeVariable.
   */
  static deserialize(data: ISerializableData): Variable {
    let selectedValue: number = parseFloat(data.selectedValue);
    let minValue: number = data.minValue;
    let maxValue: number = data.maxValue;
    let increment: number = data.increment;
    return new RangeVariable(
      data.key,
      selectedValue,
      minValue,
      maxValue,
      increment,
    );
  }
}
