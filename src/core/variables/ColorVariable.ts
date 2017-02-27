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

import * as TinyColor from "tinycolor2";

import { ConstraintType, ControlType, DataType } from "../../lib/Constants";
import { ISerializableData } from "../../lib/LocalStorage";
import { IVariableCallback, IVariableListParams, Variable } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for color values.
 * @interface
 * @extends IVariableListParams
 */
interface IColorVariableParams extends IVariableListParams {
  initialValue: string;
  selectedValue: string;
  limitedToValues?: string[];
}

/**
 * A class representing a type of Variable for color values.
 * @class
 * @extends Variable
 * @implements {IColorVariableParams}
 */
export class ColorVariable extends Variable implements IColorVariableParams {

  /**
   * Creates an instance of a ColorVariable.
   * @constructor
   * @param  {string}            key             A unique key for the Variable.
   * @param  {string}            initialValue    The initial selected value.
   * @param  {string[]}          limitedToValues The array of allowed values.
   * @param  {IVariableCallback} callback        The callback to invoke when updated.
   * @return {ColorVariable}
   */
  constructor(
    key: string,
    initialValue: string,
    limitedToValues?: string[],
    callback?: IVariableCallback,
  ) {
    super(key, DataType.COLOR, initialValue, callback);
    this.limitedToValues = limitedToValues ? limitedToValues : [];
    this.controlType = (this.limitedToValues.length > 0) ?
        ControlType.COLOR_LIST : ControlType.COLOR_INPUT;
  }

  /**
   * The data constraint type for this Variable.
   * @type {string}
   * @readonly
   */
  get constraintType(): string {
    return this.limitedToValues.length > 0 ?
        ConstraintType.LIST : ConstraintType.NONE;
  }

  /**
   * Updates the selected value.
   * @override
   * @param {any} value The selected value.
   */
  updateValue(value: any): void {
    let hexColorValue = TinyColor(value).toHexString();
    super.updateValue(hexColorValue);
  }

  /**
   * Clones the variable.
   * @return {ColorVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new ColorVariable(
      this.key,
      this.selectedValue,
      this.limitedToValues,
    );
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * The array of allowed values for this Variable.
   * @override
   * @type {string[]}
   */
  limitedToValues?: string[];

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    let data = super.serialize();
    data.selectedValue = TinyColor(this.selectedValue).toRgb();
    data.limitedToValues = this.limitedToValues.map((value: any) => {
      return TinyColor(value).toRgb();
    });
    return data;
  }

  /**
   * Returns a new initialized ColorVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {ColorVariable}          A new initialized ColorVariable.
   */
  static deserialize(data: ISerializableData): Variable {
    let selectedValue = TinyColor(data.selectedValue).toHexString();
    let limitedToValues = data.limitedToValues.map((color: string) => {
      return TinyColor(color).toHexString();
    });
    let variable = new ColorVariable(data.key, selectedValue, limitedToValues);
    variable.title = data.title;
    return variable;
  }
}
