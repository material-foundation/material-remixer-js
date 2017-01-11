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
import { Messaging } from "./Messaging";
import { StorageKey } from "./Constants";
import { Variable } from "../core/variables/Variable";

export interface IRemoteParams {
  remoteId: string;
  isActive: boolean;
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
      // return this.
      return this.generateRemoteId();
    }
    return this._remoteId;
  }

  private _isActive: boolean = false;

  get isActive(): boolean {
    return this._isActive;
  }

  storeRemoteId(remoteId: string) {
    localStorage.setItem(StorageKey.REMIXER_REMOTE, remoteId);
  }

  retrieveRemoteId(): string | void {
    return localStorage.getItem(StorageKey.REMIXER_REMOTE);
  }

  static startObservingUpdates(): void {
    this._sharedInstance._isActive = true;

    // // Example to observe the remote for variable updates.
    // this._sharedInstance.reference().on("child_added", function(data) {
    //   console.log("added...");
    //   // var variable = remixer.variableForKey:data.key];
    //   // variable.selectedValue = data.selectedValue;
    //   // remixer.updateVariable(variable);
    // });

    // Example to observe the remote for variable updates.
    this._sharedInstance.reference().on("child_changed", function(data) {
      console.log("changed...");
      let variable = remixer.getVariable(data.key);

      // variable.selectedValue = data.val().selectedValue;
      // remixer.updateVariable(variable, data.val().selectedValue);

      // Messaging.postToFrame(Messaging.type.ForceUpdate);


      let variables = remixer.attachedInstance.variablesArray;
      const index = variables.indexOf(variable);
      let clonedVariable = variable.clone();
      // clonedVariable.selectedValue = data.val().selectedValue;
      remixer.updateVariable(clonedVariable, data.val().selectedValue);
      variables[index] = clonedVariable;

    });
  }

  static stopObservingUpdates(): void {
    this.removeAllVariables();
    this._sharedInstance._isActive = false;
  }

  static saveVariable(variable: Variable): void {
    if (this._sharedInstance.isActive) {
      this._sharedInstance.reference().child(variable.key).set(variable.serialize());
    }
  }

  static removeAllVariables(): void {
    if (this._sharedInstance.isActive) {
      this._sharedInstance.reference().remove();
    }
  }

}
