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

import { ConstraintType, DataType } from "../../lib/Constants";
import { ISerializableData } from "../../lib/LocalStorage";
import { IVariableCallback, IVariableListParams, Variable } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for string values.
 * @interface
 * @extends IVariableListParams
 */
interface IStringVariableParams extends IVariableListParams {
  defaultValue: string;
  selectedValue: string;
  limitedToValues?: string[];
}

/**
 * A class representing a type of Variable for string values.
 * @class
 * @extends Variable
 * @implements {IStringVariableParams}
 */
export class StringVariable extends Variable implements IStringVariableParams {

  /**
   * Creates an instance of a StringVariable.
   * @constructor
   * @param  {string}            key            [A unique key for the Variable.
   * @param  {string}            defaultValue   The default value.
   * @param  {string[]}          limitedToValues The array of allowed values.
   * @param  {IVariableCallback} callback       The callback to invoke when updated.
   * @return {StringVariable}
   */
  constructor(
    key: string,
    defaultValue: string,
    limitedToValues?: string[],
    callback?: IVariableCallback,
  ) {
    super(key, DataType.STRING, defaultValue, callback);
    this.limitedToValues = limitedToValues ? limitedToValues : [];
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
   * @return {StringVariable} Returns the cloned variable.
   */
  clone() {
    let cloned = new StringVariable(
      this.key,
      this.defaultValue,
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
    data.selectedValue = this.selectedValue;
    data.limitedToValues = this.limitedToValues;
    return data;
  }

  /**
   * Returns a new initialized StringVariable from serialized data.
   * @override
   * @param  {ISerializableData} data The serialized data.
   * @return {StringVariable}         A new initialized StringVariable.
   */
  static deserialize(data: ISerializableData): StringVariable {
    return new StringVariable(
      data.key,
      data.selectedValue,
      data.limitedToValues,
    );
  }
}
