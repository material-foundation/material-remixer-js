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

import * as firebase from "firebase";
import * as uuid from "uuid";

import { remixer } from "../core/Remixer";
import { throttle } from "lodash";
import { Messaging } from "./Messaging";
import { LocalStorage } from "./LocalStorage";
import { StorageKey } from "./Constants";
import { Variable } from "../core/variables/Variable";

/**
 * The Remote class is a singleton class that provides the ability to store
 * and retrieve Variables on a remote controller. It also provides listeners
 * for Variable updates remotely.
 * @class
 */
export class Remote  {

  /**
   * Initializes a new instance of Remote.
   * @private
   * @static
   * @return {Remote} A new instance of Remote.
   */
  private static _sharedInstance = new Remote();

  /**
   * Throttles network save calls.
   * @private
   * @static
   * @type {any}
   */
  private static _throttle: any;

  /**
   * The remote ID.
   * @private
   * @type {string}
   */
  private remoteId: string;

  /**
   * Whether the remote controller is enabled.
   * @private
   * @type {string}
   */
  private enabled: boolean = false;

  /**
   * Initializes the remote controller.
   *
   * A call to this method will allow you to share your Variables to the
   * remote controller being hosted as per your firebase configuration.
   * @static
   * @param {{}} config The firebase credentials.
   */
  static initializeRemote(config: {}): void {
    // Get the locally stored remoteId. If doesn't exist, generate a new one
    // and store it.
    let storedRemoteId = this.getStoredRemoteId();
    if (!storedRemoteId) {
      storedRemoteId = this.storeRemoteId(this.generateRemoteId());
    }
    this._sharedInstance.remoteId = storedRemoteId;
    firebase.initializeApp(config);
  }

  /**
   * Returns the remote id from local storage.
   * @private
   * @static
   * @return {string} Returns the remote id.
   */
  private static getStoredRemoteId(): string {
    return LocalStorage.getPreference(StorageKey.KEY_REMOTE_ID);
  }

  /**
   * Stores the remote id to local storage.
   * @private
   * @static
   * @param  {string} remoteId The remote id.
   * @return {string}          Returns the remote id.
   */
  private static storeRemoteId(remoteId: string): string {
    LocalStorage.savePreference(StorageKey.KEY_REMOTE_ID, remoteId);
    return remoteId;
  }

  /**
   * Generates a unique id consisting of 8 chars.
   * @private
   * @static
   * @return {string} Returns the new remote id.
   */
  private static generateRemoteId(): string {
    return uuid().substring(0, 8);
  }

  /**
   * Returns a database reference to the remixer instance.
   * @private
   * @return {firebase.database.Reference} The firebase database reference.
   */
  private dbReference(): firebase.database.Reference {
    return firebase.database().ref(`remixer/${this.remoteId}`);
  }

  /**
   * Start sharing the variable updates to the remote controller.
   * @static
   */
  static startSharing(): void {
    this._throttle = throttle(this._save, 300);
    this._sharedInstance.enabled = true;
  }

  /**
   * Stops sharing the variable updates to the remote controller.
   * @static
   */
  static stopSharing(): void {
    this._throttle.cancel();
    this._sharedInstance.enabled = false;
  }

  /**
   * Saves a variable remotely.
   *
   * A control's UI allows very fast updating of the selected value. For
   * example the quick dragging of a slider, or keyboard input of a textbox.
   * These selected value updates should be throttled since we only care
   * about the final selected value and not intermittent changes.
   *
   * However adding a new Variable with params should not be throttled in
   * order to capture many Variables be adding in quick succession.
   *
   * Defaults to throttle for saves to prevent network jank.
   * @static
   * @param {Variable} variable The variable to save.
   * @param {boolean = true}    Whether to throttle the saves.
   */
  static saveVariable(variable: Variable, throttle: boolean = true): void {
    if (this._sharedInstance.enabled) {
      if (throttle) {
        this._throttle(variable);
      } else {
        this._save(variable);
      }
    }
  }

  /**
   * Removes all variables remotely.
   */
  static removeAllVariables(): void {
    if (this._sharedInstance.enabled) {
      this._sharedInstance.dbReference().remove();
    }
  }

  /**
   * Performs the saving of the variable.
   *
   * When saving to remote, we first stop observing updates then restart after
   * the update. This prevents a cyclical error of network and local changes.
   * @private
   * @static
   * @param {Variable} variable The variable to save.
   */
  private static _save(variable: Variable): void {
    if (this._sharedInstance.enabled) {
      this.stopObservingUpdates(variable.key);
      this._sharedInstance.dbReference().child(variable.key).set(variable.serialize());
      this.startObservingUpdates(variable.key);
    }
  }

  /**
   * Starts a listener for any changes received for a variable.
   * @private
   * @static
   * @param {string} variableKey The variable key.
   */
  private static startObservingUpdates(variableKey: string): void {
    let reference = this._sharedInstance.dbReference().child(variableKey);
    reference.on("child_changed", function(data) {
      let variable = remixer.getVariable(data.ref.parent.key);
      remixer.cloneAndUpdateVariable(variable, data.val());
    });
  }

  /**
   * Stops all change listeners for a variable.
   * @private
   * @static
   * @param {string} variableKey The variable key.
   */
  private static stopObservingUpdates(variableKey: string): void {
    this._sharedInstance.dbReference().child(variableKey).off();
  }
}
