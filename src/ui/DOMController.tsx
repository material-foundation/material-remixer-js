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

import "./overlay/styles.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { KeyCode, KeyEvent, CSS } from "../lib/Constants";
import { Messaging } from "../lib/Messaging";
import { Overlay } from "./overlay/Overlay";
import { Variable } from "../core/variables/Variable";
import { remixer } from "../core/Remixer";

/**
 * Interface for the properties assigned to the DOMController component.
 * @interface
 */
interface ControllerProps { wrapperElement: HTMLElement; }

/**
 * Interface for the state of the DOMController component.
 * @interface
 */
interface ControllerState { variables?: Array<Variable>; }

/**
 * Renders an MDL card-styled overlay containing a child control for each
 * variable.
 * @class
 * @extends React.Component
 */
export class DOMController extends React.Component<ControllerProps, ControllerState> {
  state = {
    variables: remixer.attachedInstance.variablesArray,
  };

  /** @override */
  componentDidMount() {
    // Register for messaging and key events.
    Messaging.register(this.onMessageReceived.bind(this));
    this.addKeyListener();
  }

  /** @override */
  componentWillUnmount() {
    // Unregister for messaging and key events.
    Messaging.unregister();
    this.removeKeyListener();
  }

  /**
   * Handles receiving of window message.
   * @param {MessageEvent} event The received message event.
   */
  onMessageReceived(event: MessageEvent): void {
    if (event.data === Messaging.type.ToggleVisibility) {
      this.toggleVisibility();
    }
  }

  /** Adds a key listener. */
  addKeyListener(): void {
    document.addEventListener(KeyEvent.DOWN, (e: KeyboardEvent) => {
      if (e.keyCode === KeyCode.ESC) {
        this.toggleVisibility();
      }
    });
  }

  /** Removes a key listener. */
  removeKeyListener(): void {
    document.removeEventListener(KeyEvent.DOWN);
  }

  /** Toggles the Remixer overlay visibility. */
  toggleVisibility() {
    this.props.wrapperElement.classList.toggle(CSS.RMX_VISIBLE);
  }

  /** @override */
  render() {
    return (
      <div className="mdl-card mdl-shadow--6dp">
        <div className="mdl-card__title" ref="myInput">
          <h2 className="mdl-card__title-text">Remixer</h2>
        </div>
        <div className="mdl-card__supporting-text mdl-card__actions mdl-card--border">
          <Overlay variables={this.state.variables} />
        </div>
      </div>
    );
  }
}

/**
 * Renders the DOMController component to the overlay wrapper element.
 */
let element = document.getElementById(CSS.RMX_OVERLAY_WRAPPER);
ReactDOM.render(<div><DOMController wrapperElement={element} /></div>, element);
