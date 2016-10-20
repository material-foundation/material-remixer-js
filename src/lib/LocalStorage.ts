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

import * as vars from "../core/variables/variableTypes";
import { Constants as CONST } from "../lib/Constants";
import { remixer } from "../core/Remixer";

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
   * @param  {string}        key The key if the Variable to retrieve.
   * @return {Variable}
   */
  static getVariable(key: string): vars.Variable {
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
  static saveVariable(variable: vars.Variable): void {
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
  private static deserialize(data: SerializableData): vars.Variable {
    switch (data.dataType) {
      case CONST.VARIABLE_TYPE_BOOLEAN:
        return vars.BooleanVariable.deserialize(data);
      case CONST.VARIABLE_TYPE_COLOR:
        return vars.ColorVariable.deserialize(data);
      case CONST.VARIABLE_TYPE_NUMBER:
        return vars.NumberVariable.deserialize(data);
      case CONST.VARIABLE_TYPE_RANGE:
        return vars.RangeVariable.deserialize(data);
      case CONST.VARIABLE_TYPE_STRING:
        return vars.StringVariable.deserialize(data);
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
    let data: SerializableDataMap = JSON.parse(localStorage.getItem(CONST.STORAGE_KEY_REMIXER));
    return data || {};
  }

  /**
   * Saves the raw JSON data to local storage.
   * @private
   * @static
   * @param {SerializableDataMap} data The serialized data to save.
   */
  private static saveRawData(data: SerializableDataMap): void {
    localStorage.setItem(CONST.STORAGE_KEY_REMIXER, JSON.stringify(data));
  }
}
