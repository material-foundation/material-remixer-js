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

import { ConstraintType, ControlType, DataType } from '../../lib/Constants';
import { ISerializableData } from '../../lib/LocalStorage';
import { IVariableCallback, IVariableListParams, Variable } from './Variable';

/**
 * Interface for a class that represents a type of Variable for number values.
 * @interface
 * @extends IVariableListParams
 */
interface INumberVariableParams extends IVariableListParams {
  initialValue: number;
  selectedValue: number;
  limitedToValues?: number[];
}

/**
 * A class representing a type of Variable for number values.
 * @class
 * @extends Variable
 * @implements {INumberVariableParams}
 */
export class NumberVariable extends Variable implements INumberVariableParams {

  /**
   * Creates an instance of a ColorVariable.
   * @constructor
   * @param  {string}            key            A unique key for the Variable.
   * @param  {number}            initialValue   The initial selected value.
   * @param  {number[]}          limitedToValues The array of allowed values.
   * @param  {IVariableCallback} callback       The callback to invoke when updated.
   * @return {NumberVariable}
   */
  constructor(
    key: string,
    initialValue: number,
    limitedToValues?: number[],
    callback?: IVariableCallback,
  ) {
    super(key, DataType.NUMBER, initialValue, callback);
    this.limitedToValues = limitedToValues ? limitedToValues : [];
    if (this.limitedToValues.length === 0) {
      this.controlType = ControlType.TEXT_INPUT;
    } else if (this.limitedToValues.length <= 2) {
      this.controlType = ControlType.SEGMENTED;
    } else {
      this.controlType = ControlType.TEXT_LIST;
    }
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
   * Clones the variable.
   * @return {NumberVariable} Returns the cloned variable.
   */
  clone() {
    const cloned = new NumberVariable(
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
   * @type {number[]}
   */
  limitedToValues?: number[];

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    const data = super.serialize();
    data.selectedValue = this.selectedValue;
    data.limitedToValues = this.limitedToValues;
    return data;
  }

  /**
   * Returns a new initialized NumberVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {NumberVariable}         A new initialized NumberVariable.
   */
  static deserialize(data: ISerializableData): Variable {
    const variable = new NumberVariable(
      data.key,
      data.selectedValue,
      data.limitedToValues,
    );
    variable.title = data.title;
    return variable;
  }
}
