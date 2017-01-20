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

// import * as Firebase from "firebase";
import * as firebase from "firebase";
import * as uuid from "uuid";

import { remixer } from "../core/Remixer";
import { throttle } from "lodash";
import { Messaging } from "./Messaging";
import { StorageKey } from "./Constants";
import { Variable } from "../core/variables/Variable";

export interface IRemoteParams {
  remoteId: string;
  enabled: boolean;
}

export class Remote implements IRemoteParams {

  constructor(remoteId?: string) {
    let storedRemoteId = this.retrieveRemoteId();
    if (remoteId) {
      this._remoteId = remoteId;
      this.storeRemoteId(remoteId);
    } else if (storedRemoteId) {
      this._remoteId = storedRemoteId;
    } else {
      this._remoteId = this.generateRemoteId();
      this.storeRemoteId(this._remoteId);
    }
    this.initializeApp();
  }

  private static _sharedInstance = new Remote();

  private static _throttle: any;

  private initializeApp(): void {
    let config = {
      apiKey: "AIzaSyDSpY_SFxddoUybdhh6cc4rEUe7o_6ek8I",
      authDomain: "remixer-16a0b.firebaseapp.com",
      databaseURL: "https://remixer-16a0b.firebaseio.com",
      storageBucket: "remixer-16a0b.appspot.com",
      messagingSenderId: "606421912683"
    };
    firebase.initializeApp(config);
  }

  private reference(): firebase.database.Reference {
    return firebase.database().ref(`remixer/${this.remoteId}`);
  }

  private generateRemoteId(): string {
    return this._remoteId = uuid().substring(0, 8);
  }

  private _remoteId: string;

  get remoteId(): string {
    if (!this._remoteId) {
      return this.generateRemoteId();
    }
    return this._remoteId;
  }

  enabled: boolean = false;

  static startSharing(): void {
    this._throttle = throttle(this._save, 300);
    this._sharedInstance.enabled = true;
  }

  static stopSharing(): void {
    this._throttle.cancel();
  }

  storeRemoteId(remoteId: string) {
    localStorage.setItem(StorageKey.REMIXER_REMOTE, remoteId);
  }

  retrieveRemoteId(): string | void {
    return localStorage.getItem(StorageKey.REMIXER_REMOTE);
  }

  static startObservingUpdates(variableKey: string): void {
    let reference = this._sharedInstance.reference().child(variableKey);
    reference.on("child_changed", function(data) {
      let variable = remixer.getVariable(data.ref.parent.key);
      remixer.cloneAndUpdateVariable(variable, data.val());
    });
  }

  static stopObservingUpdates(variableKey: string): void {
    this._sharedInstance.reference().child(variableKey).off();
  }

  static saveVariable(variable: Variable, throttle: boolean = true): void {
    // Throttle by default to prevent network jank when updating a control's
    // selected values. However, typically we should not throttle when saving
    // a controls the first time.
    if (this._sharedInstance.enabled) {
      if (throttle) {
        this._throttle(variable);
      } else {
        this._save(variable);
      }
    }
  }

  private static _save(variable: Variable): void {
    if (this._sharedInstance.enabled) {
      this.stopObservingUpdates(variable.key);
      this._sharedInstance.reference().child(variable.key).set(variable.serialize());
      this.startObservingUpdates(variable.key);
    }
  }

  static removeAllVariables(): void {
    if (this._sharedInstance.enabled) {
      this._sharedInstance.reference().remove();
    }
  }
}
