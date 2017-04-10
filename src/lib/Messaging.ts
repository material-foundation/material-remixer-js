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

import { CSS } from '../lib/Constants';

/**
 * Available messaging types.
 * @enum
 */
enum MessagingType {
  ToggleVisibility,
}

/**
 * A class that provides ability to interact with the `window.postMessage` API.
 *
 * Under the hood, Remixer is appending an HTML iFrame to the body of a client's
 * page. The main purpose of this Message class is to simply wrap the
 * `window.postMessage` API to simplify passing messages between the root window
 * and the Remixer iFrame.
 */
export class Messaging {

  /**
   * The avaiable messaging types.
   * @static
   * @type {MessagingType}
   */
  static type = MessagingType;

  /**
   * Registers an event listener to allow listening for window messages.
   * @static
   * @param {Function} callback A callback to invoke after registration.
   */
  static register(callback?: Function): void {
    window.addEventListener('message', (e: MessageEvent) => {
      if (callback) {
        callback(e);
      }
    });
  }

  /**
   * Unregisters an event listener that allowed listening for window messages.
   * @static
   * @param {Function} callback A callback to invoke after unregistration.
   */
  static unregister(callback?: Function): void {
    window.removeEventListener('message', (e: MessageEvent) => {
      if (callback) {
        callback(e);
      }
    });
  }

  /**
   * Sends a message from main app window to Remixer iFrame window.
   * @param {MessagingType} message The message type to send.
   */
  static postToFrame(message: MessagingType): void {
    const frame = document.getElementById(CSS.RMX_OVERLAY_FRAME) as HTMLFrameElement;
    frame.contentWindow.postMessage(message, '*');
  }
}
