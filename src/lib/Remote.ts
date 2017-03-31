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

import * as firebase from 'firebase';
import * as uuid from 'uuid';

import { throttle } from 'lodash';
import { remixer } from '../core/Remixer';
import { Variable } from '../core/variables/Variable';
import { StorageKey } from './Constants';
import { LocalStorage } from './LocalStorage';
import { Messaging } from './Messaging';

// The number of milliseconds to throttle invocations to.
const THROTTLE_WAIT = 300;

/**
 * The Remote class is a singleton class that provides the ability to store
 * and retrieve Variables on a remote controller. It also provides listeners
 * for Variable updates done remotely.
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
   * Provides ability for Remixer HTML iFrame to access this instance of Remote.
   * @return {Remote} The attached instance of Remote.
   */
  static get attachedInstance(): Remote {
    return this._sharedInstance;
  }

  /**
   * Throttles network save calls.
   * @private
   * @static
   * @type {any}
   */
  private _throttledSaveVariable: any;

  private _enabled: boolean;

  /**
   * Whether the remote controller is enabled.
   * @static
   * @readonly
   * @return {boolean}
   */
  get isEnabled(): boolean {
    return this._initialized && this._enabled;
  }

  private _remoteId: string;

  /**
   * Returns the remote controller ID.
   * @readonly
   * @return {string} The remote controller ID.
   */
  get remoteId(): string {
    return this._remoteId;
  }

  /**
   * Returns the remote controller URL.
   *
   * Example URL:
   *   "https://<PROJECT-ID>.firebaseapp.com/<REMOTE-ID>"
   * @readonly
   * @return {string} The remote controller URL.
   */
  get remoteUrl(): string {
    const authDomain = firebase.app().options['authDomain'];
    return `https://${authDomain}/${this._remoteId}`;
  }

  private _initialized: boolean = false;

  /**
   * Returns whether the remote has been initialized with Firebase credentials.
   * @readonly
   * @return {boolean} Returns true if has Firebase credentials.
   */
  get initialized(): boolean {
    return this._initialized;
  }

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
    const instance = this._sharedInstance;
    let storedRemoteId = instance.getPreference(StorageKey.KEY_REMOTE_ID);
    if (!storedRemoteId) {
      storedRemoteId = instance.generateRemoteId();
      instance.savePreference(StorageKey.KEY_REMOTE_ID, storedRemoteId);
    }
    instance._remoteId = storedRemoteId;

    // Check if enabled.
    let remoteEnabled = instance.getPreference(StorageKey.KEY_REMOTE_ENABLED);
    if (!remoteEnabled) {
      remoteEnabled = false;
      instance.savePreference(StorageKey.KEY_REMOTE_ENABLED, remoteEnabled);
    }
    instance._enabled = remoteEnabled;

    if (remoteEnabled) {
      instance.startSharing();
    }

    firebase.initializeApp(config);
    instance._initialized = Object.keys(config).length !== 0;
  }

  /**
   * Generates a unique id consisting of 8 chars.
   * @private
   * @return {string} Returns the new remote id.
   */
  private generateRemoteId(): string {
    return uuid().substring(0, 8);
  }

  /**
   * Returns a database reference to the remixer instance.
   * @private
   * @return {firebase.database.Reference} The firebase database reference.
   */
  private dbReference(): firebase.database.Reference {
    return firebase.database().ref(`${StorageKey.KEY_REMIXER}/${this._remoteId}`);
  }

  /**
   * Start sharing the variable updates to the remote controller.
   */
  startSharing(): void {
    this._throttledSaveVariable = throttle(this._save, THROTTLE_WAIT);
    this._enabled = true;
    this.savePreference(StorageKey.KEY_REMOTE_ENABLED, true);

    // Save each variable without throttling.
    for (const variable of remixer.attachedInstance.variablesArray) {
      Remote.saveVariable(variable, false);
    }
  }

  /**
   * Stops sharing the variable updates to the remote controller.
   */
  stopSharing(): void {
    this._throttledSaveVariable.cancel();
    this.savePreference(StorageKey.KEY_REMOTE_ENABLED, false);
    this.stopObservingUpdates();
    Remote.removeAllVariables();
    this._enabled = false;
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
    if (this._sharedInstance.isEnabled) {
      if (throttle) {
        this._sharedInstance._throttledSaveVariable(variable);
      } else {
        this._sharedInstance._save(variable);
      }
    }
  }

  /**
   * Removes all variables remotely.
   * @static
   */
  static removeAllVariables(): void {
    if (this._sharedInstance.isEnabled) {
      this._sharedInstance.dbReference().remove();
    }
  }

  /**
   * Performs the saving of the variable.
   *
   * When saving to remote, we first stop observing updates then restart after
   * the update. This prevents a cyclical error of network and local changes.
   * @private
   * @param {Variable} variable The variable to save.
   */
  private _save(variable: Variable): void {
    if (this.isEnabled) {
      this.stopObservingUpdates(variable.key);
      this.dbReference().child(variable.key).set(variable.serialize());
      this.startObservingUpdates(variable.key);
    }
  }

  /**
   * Starts a listener for any changes received for a variable.
   * @private
   * @param {string} variableKey The variable key.
   */
  private startObservingUpdates(variableKey: string): void {
    const reference = this.dbReference().child(variableKey);
    reference.on('child_changed', (data) => {
      const variable = remixer.getVariable(data.ref.parent.key);
      remixer.cloneAndUpdateVariable(variable, data.val());
    });
  }

  /**
   * Stops all change listeners for a variable.
   * @private
   * @param {string} variableKey The optional variable key.
   */
  private stopObservingUpdates(variableKey?: string): void {
    if (variableKey) {
      this.dbReference().child(variableKey).off();
    } else {
      this.dbReference().off();
    }
  }

  /**
   * Retrieves a preference from local storage.
   * @private
   * @param  {string} key The key of the preference to retrieve.
   * @return {any}        Returns the preference object.
   */
  private getPreference(key: string): any {
    return LocalStorage.getPreference(key);
  }

  /**
   * Saves a preference to local storage.
   * @private
   * @param {string} key   The preference key.
   * @param {any}    value The preference value.
   */
  private savePreference(key: string, value: any): void {
    LocalStorage.savePreference(key, value);
  }
}
