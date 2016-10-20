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
import { Variable, VariableListType, VariableCallback } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for string values.
 * @interface
 * @extends VariableType
 */
interface StringVariableType extends VariableListType {
  defaultValue: string;
  selectedValue: string;
  possibleValues?: Array<string>;
}

/**
 * A class representing a type of Variable for string values.
 * @class
 * @extends Variable
 * @implements {StringVariableType}
 */
export class StringVariable extends Variable implements StringVariableType {

  /**
   * Creates an instance of a StringVariable.
   * @constructor
   * @param  {string}           key            [A unique key for the Variable.
   * @param  {string}           defaultValue   The default value.
   * @param  {Array<string>}    possibleValues The array of possible values.
   * @param  {VariableCallback} callback       The callback to invoke when updated.
   * @return {StringVariable}
   */
  constructor(key: string, defaultValue: string, possibleValues?: Array<string>, callback?: VariableCallback) {
    super(key, CONST.VARIABLE_TYPE_STRING, defaultValue, callback);
    this.possibleValues = possibleValues;
  }

  /**
   * The array of possible values for this Variable.
   * @override
   * @type {Array<string>}
   */
  possibleValues?: Array<string>;

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue;
    data.possibleValues = this.possibleValues;
    return data;
  }

  /**
   * Returns a new initialized StringVariable from serialized data.
   * @override
   * @param  {SerializableData} data The serialized data.
   * @return {StringVariable}        A new initialized StringVariable.
   */
  static deserialize(data: SerializableData): StringVariable {
    return new StringVariable(data.key, data.selectedValue, data.possibleValues);
  }
}
