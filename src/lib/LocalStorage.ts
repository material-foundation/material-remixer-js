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

import { BooleanVariable } from "../core/variables/BooleanVariable";
import { ColorVariable } from "../core/variables/ColorVariable";
import { ConstraintType, DataType, StorageKey } from "../lib/Constants";
import { NumberVariable } from "../core/variables/NumberVariable";
import { RangeVariable } from "../core/variables/RangeVariable";
import { StringVariable } from "../core/variables/StringVariable";
import { Variable } from "../core/variables/Variable";

/**
 * Interface for a class that represents serialized data.
 * @interface
 */
export interface ISerializableData {
  key: string;
  constraintType: string;
  controlType: string;
  dataType: string;
  title: string;
  initialValue: any;
  selectedValue: any;
  limitedToValues?: any[];
  minValue?: number;
  maxValue?: number;
  increment?: number;
}

/**
 * Interface that maps a serialized data to a global "remixer" key.
 * @interface
 */
interface ISerializableDataMap {
  [remixer: string]: ISerializableData;
}

interface ISerializablePreferences {
  remoteId: string;
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
    let variableData = remixerData[key] as ISerializableData;
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

  static savePreference(key: string, value: any): void {
    let prefs = this.getRawPreferences();
    prefs[key] = value;
    this.saveRawPreferences(prefs);
  }

  static getPreference(key: string): any {
    let prefs = this.getRawPreferences();
    return prefs[key];
  }

  /**
   * Returns an initialized Variable based on the data type.
   * @private
   * @static
   * @param  {ISerializableData} data The serialized data.
   * @return {Variable}
   */
  private static deserialize(data: ISerializableData): Variable {
    switch (data.dataType) {
      case DataType.BOOLEAN:
        return BooleanVariable.deserialize(data);
      case DataType.COLOR:
        return ColorVariable.deserialize(data);
      case DataType.NUMBER:
        if (data.constraintType === ConstraintType.RANGE) {
          return RangeVariable.deserialize(data);
        }
        return NumberVariable.deserialize(data);
      case DataType.STRING:
        return StringVariable.deserialize(data);
      default:
        return null;
    }
  }

  /**
   * Retrieves the raw JSON data from local storage.
   * @private
   * @static
   * @return {ISerializableDataMap} The json data from local storage.
   */
  private static getRawData(): ISerializableDataMap {
    let data = JSON.parse(localStorage.getItem(StorageKey.REMIXER));
    return data ? data[StorageKey.VARIABLES] : {};
  }

  /**
   * Saves the raw JSON data to local storage.
   * @private
   * @static
   * @param {ISerializableDataMap} data The serialized data to save.
   */
  private static saveRawData(data: ISerializableDataMap): void {
    localStorage.setItem(StorageKey.REMIXER, JSON.stringify({[StorageKey.VARIABLES]: data}));
  }

  private static getRawPreferences(): ISerializablePreferences {
    let preferences = JSON.parse(localStorage.getItem(StorageKey.PREFERENCES));
    return preferences || {};
  }

  private static saveRawPreferences(preferences: ISerializablePreferences): void {
    localStorage.setItem(StorageKey.PREFERENCES, JSON.stringify(preferences));
  }
}
