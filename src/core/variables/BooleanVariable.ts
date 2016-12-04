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

import { ISerializableData } from "../../lib/LocalStorage";
import { IVariableCallback, IVariableParams, Variable } from "./Variable";
import { VariableType } from "../../lib/Constants";

/**
 * Interface for a class that represents a type of Variable for boolean values.
 * @interface
 * @extends IVariableParams
 */
interface IBooleanVariableParams extends IVariableParams {
  defaultValue: boolean;
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
   * @param  {boolean}           defaultValue The default value.
   * @param  {IVariableCallback} callback     The callback to invoke when updated.
   * @return {BooleanVariable}
   */
  constructor(
    key: string,
    defaultValue: boolean,
    callback?: IVariableCallback,
  ) {
    super(key, VariableType.BOOLEAN, defaultValue, callback);
  }

  /**
   * Clones the variable.
   * @return {BooleanVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new BooleanVariable(this.key, this.defaultValue, null);
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
    let data = super.serialize();
    data.defaultValue = this.defaultValue;
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
    return new BooleanVariable(data.key, data.selectedValue);
  }
}
