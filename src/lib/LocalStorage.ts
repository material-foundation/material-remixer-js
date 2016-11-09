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

import { remixer } from "../core/Remixer";
import { BooleanVariable } from "../core/variables/BooleanVariable";
import { ColorVariable } from "../core/variables/ColorVariable";
import { NumberVariable } from "../core/variables/NumberVariable";
import { RangeVariable } from "../core/variables/RangeVariable";
import { StringVariable } from "../core/variables/StringVariable";
import { Variable } from "../core/variables/Variable";
import { StorageKey, VariableType } from "../lib/Constants";

/**
 * Interface for a class that represents serialized data.
 * @interface
 */
export interface SerializableData {
  key: string;
  dataType: string;
  title: string;
  defaultValue: any;
  selectedValue: any;
  possibleValues?: Array<any>;
  minValue?: number;
  maxValue?: number;
  increment?: number;
}

/**
 * Interface that maps a serialized data to a global "remixer" key.
 * @interface
 */
interface SerializableDataMap {
  [remixer: string]: SerializableData;
}

/**
 * A class that provides utilities to interact with browser local storage.
 * @class
 */
export class LocalStorage {

  /**
   * Retrieves a single Variable from local storage.
   * @static
   * @param  {string} key The key if the Variable to retrieve.
   * @return {Variable}
   */
  static getVariable(key: string): Variable {
    let remixerData = this.getRawData();
    let variableData = remixerData[key] as SerializableData;
    if (variableData) {
      return this.deserialize(variableData);
    }
    return null;
  }

  /**
   * Saves a Variable to local storage.
   * @static
   * @param {Variable} variable The variable to save.
   */
  static saveVariable(variable: Variable): void {
    let remixerData = this.getRawData();
    remixerData[variable.key] = variable.serialize();
    this.saveRawData(remixerData);
  }

  /**
   * Returns an initialized Variable based on the data type.
   * @private
   * @static
   * @param  {SerializableData} data The serialized data.
   * @return {Variable}
   */
  private static deserialize(data: SerializableData): Variable {
    switch (data.dataType) {
      case VariableType.BOOLEAN:
        return BooleanVariable.deserialize(data);
      case VariableType.COLOR:
        return ColorVariable.deserialize(data);
      case VariableType.NUMBER:
        return NumberVariable.deserialize(data);
      case VariableType.RANGE:
        return RangeVariable.deserialize(data);
      case VariableType.STRING:
        return StringVariable.deserialize(data);
      default:
        return null;
    }
  }

  /**
   * Retrieves the raw JSON data from local storage.
   * @private
   * @static
   * @return {SerializableDataMap} The json data from local storage.
   */
  private static getRawData(): SerializableDataMap {
    let data: SerializableDataMap = JSON.parse(localStorage.getItem(StorageKey.REMIXER));
    return data || {};
  }

  /**
   * Saves the raw JSON data to local storage.
   * @private
   * @static
   * @param {SerializableDataMap} data The serialized data to save.
   */
  private static saveRawData(data: SerializableDataMap): void {
    localStorage.setItem(StorageKey.REMIXER, JSON.stringify(data));
  }
}
