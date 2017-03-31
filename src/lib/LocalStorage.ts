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

import { BooleanVariable } from '../core/variables/BooleanVariable';
import { ColorVariable } from '../core/variables/ColorVariable';
import { NumberVariable } from '../core/variables/NumberVariable';
import { RangeVariable } from '../core/variables/RangeVariable';
import { StringVariable } from '../core/variables/StringVariable';
import { Variable } from '../core/variables/Variable';
import { ConstraintType, DataType, StorageKey } from '../lib/Constants';

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

/**
 * Interface representing serialized preferences.
 * @interface
 */
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
    const remixerData = this.getRawData();
    const variableData = remixerData[key] as ISerializableData;
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
    const remixerData = this.getRawData();
    remixerData[variable.key] = variable.serialize();
    this.saveRawData(remixerData);
  }

  /**
   * Retrieves a preference from local storage.
   * @static
   * @param  {string} key The key of the preference to retrieve.
   * @return {any}        Returns the preference object.
   */
  static getPreference(key: string): any {
    const prefs = this.getRawPreferences();
    return prefs[key];
  }

  /**
   * Saves a preference to local storage.
   * @static
   * @param {string} key   The preference key.
   * @param {any}    value The preference value.
   */
  static savePreference(key: string, value: any): void {
    const prefs = this.getRawPreferences();
    prefs[key] = value;
    this.saveRawPreferences(prefs);
  }

  /**
   * Returns an initialized Variable based on the data type.
   * @static
   * @param  {ISerializableData} data The serialized data.
   * @return {Variable}
   */
  static deserialize(data: ISerializableData): Variable {
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
    const data = JSON.parse(localStorage.getItem(StorageKey.REMIXER));
    return data ? data[StorageKey.KEY_VARIABLES] : {};
  }

  /**
   * Saves the raw JSON data to local storage.
   * @private
   * @static
   * @param {ISerializableDataMap} data The serialized data to save.
   */
  private static saveRawData(data: ISerializableDataMap): void {
    localStorage.setItem(StorageKey.REMIXER, JSON.stringify({[StorageKey.KEY_VARIABLES]: data}));
  }

  /**
   * Retrieves the raw JSON preferences from local storage.
   * @private
   * @static
   * @return {ISerializablePreferences} The preferences from local storage.
   */
  private static getRawPreferences(): ISerializablePreferences {
    const preferences = JSON.parse(localStorage.getItem(StorageKey.PREFERENCES));
    return preferences || {};
  }

  /**
   * Saves the raw JSON preferences to local storage.
   * @private
   * @static
   * @param {ISerializablePreferences} preferences The serialized preferences to save.
   */
  private static saveRawPreferences(preferences: ISerializablePreferences): void {
    localStorage.setItem(StorageKey.PREFERENCES, JSON.stringify(preferences));
  }
}
