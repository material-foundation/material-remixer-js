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

import { Constants as CONST } from "../../lib/Constants";
import { SerializableData } from "../../lib/LocalStorage";
import { Variable, VariableType, VariableCallback } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for a range of values.
 * @interface
 * @extends VariableType
 */
interface RangeVariableType extends VariableType {
  defaultValue: number;
  selectedValue: number;
  minValue: number;
  maxValue: number;
  increment: number;
}

/**
 * A class representing a type of Variable for a range of values.
 * @class
 * @extends Variable
 * @implements {RangeVariableType}
 */
export class RangeVariable extends Variable implements RangeVariableType {

  /**
   * Creates an instance of a RangeVariable.
   * @constructor
   * @param  {string}           key          A unique key for the Variable.
   * @param  {number}           defaultValue The default value.
   * @param  {number}           minValue     The minimum value allowed.
   * @param  {number}           maxValue     The maximum value allowed.
   * @param  {VariableCallback} callback     The callback method to be invoked
   *                                         when the Variable is updated.
   * @return {RangeVariable}
   */
  constructor(key: string, defaultValue: number, minValue: number, maxValue: number, callback?: VariableCallback) {
    super(key, CONST.VARIABLE_TYPE_RANGE, defaultValue, callback);
    this.minValue = minValue;
    this.maxValue = maxValue;
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
  increment: number = 0.1;

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue.toString();
    return data;
  }

  /**
   * Returns a new initialized RangeVariable from serialized data.
   * @override
   * @param  {SerializableData} data The serialized data.
   * @return {RangeVariable}         A new initialized RangeVariable.
   */
  static deserialize(data: SerializableData): Variable {
    let selectedValue: number = parseFloat(data.selectedValue);
    let minValue: number = data.minValue;
    let maxValue: number = data.maxValue;
    return new RangeVariable(data.key, selectedValue, minValue, maxValue);
  }
}
