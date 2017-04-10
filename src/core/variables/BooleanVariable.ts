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

import { ControlType, DataType } from '../../lib/Constants';
import { ISerializableData } from '../../lib/LocalStorage';
import { IVariableCallback, IVariableParams, Variable } from './Variable';

/**
 * Interface for a class that represents a type of Variable for boolean values.
 * @interface
 * @extends IVariableParams
 */
interface IBooleanVariableParams extends IVariableParams {
  initialValue: boolean;
  selectedValue: boolean;
}

/**
 * A class representing a type of Variable for boolean values.
 * @class
 * @extends Variable
 * @implements {IBooleanVariableParams}
 */
export class BooleanVariable extends Variable implements IBooleanVariableParams {

  /**
   * Creates an instance of a BooleanVariable.
   * @constructor
   * @param  {string}            key          A unique key for the Variable.
   * @param  {boolean}           initialValue The initial selected value.
   * @param  {IVariableCallback} callback     The callback to invoke when updated.
   * @return {BooleanVariable}
   */
  constructor(
    key: string,
    initialValue: boolean,
    callback?: IVariableCallback,
  ) {
    super(key, DataType.BOOLEAN, initialValue, callback);
    this.controlType = ControlType.SWITCH;
  }

  /**
   * Clones the variable.
   * @return {BooleanVariable} Returns the cloned variable.
   */
  clone() {
    const cloned = new BooleanVariable(this.key, this.selectedValue, null);
    cloned.title = this.title;
    cloned._callbacks = this._callbacks.slice();
    return cloned;
  }

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {ISerializableData} The serialized data.
   */
  serialize(): ISerializableData {
    const data = super.serialize();
    data.selectedValue = this.selectedValue;
    return data;
  }

  /**
   * Returns a new initialized BooleanVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {BooleanVariable}        A new initialized BooleanVariable.
   */
  static deserialize(data: ISerializableData): BooleanVariable {
    const variable = new BooleanVariable(data.key, data.selectedValue);
    variable.title = data.title;
    return variable;
  }
}
