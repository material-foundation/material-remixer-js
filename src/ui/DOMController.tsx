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
import { Variable, VariableCallback } from "../core/variables/Variable";
import { remixer } from "../core/Remixer";

import * as update from "immutability-helper";
// import { newContext } from "immutability-helper";

/**
 * Interface for the properties assigned to the DOMController component.
 * @interface
 */
interface ControllerProps {
  wrapperElement: HTMLElement;
  variables: Array<Variable>;
}

/**
 * Renders an MDL card-styled overlay containing a child control for each
 * variable.
 * @class
 * @extends React.Component
 */
export class DOMController extends React.Component<ControllerProps, void> {

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

  /**
   * Handles all control updates by setting a new selected value for the
   * variable.
   * @param {Variable} variable The variable to update.
   * @param {any} selectedValue The new selected value.
   */
  updateVariable = (variable: Variable, selectedValue: any): void => {
    const index = variables.indexOf(variable);
    // variable.selectedValue = update(variable.selectedValue, {$set: selectedValue});
    // variable.selectedValue = selectedValue;
    //
    // const newVariable = update(variable, {
    //   selectedValue: {$set: "hello"}
    // });

    // const newVariable = update(variable, {
    //   $merge: {selectedValue: "hello"}
    // });
    //
    //
    // console.log(variables);


    // let newVariables = update(variables, {
    //   0: {variable: { $set: { selectedValue: "hello" }}}
    // });

    const newVariable = update(variables, {
      [index]: {selectedValue: {$set: "hello"}}
    });

    // update.extend("$yo", function(newValue, original) {
    //   console.log(newValue, original);
    //   let sv = "hello";
    //   original.selectedValue = sv;
    //   return original;
    // });
    //
    // const newVariable = update(variable, {
    //   $yo: {selectedValue: "hello"}
    // });

    // const myUpdate = newContext();
    // myUpdate.extend(variable, function(value: any, original: any) {
    //   return original;
    // });


    // const newVariable = update(variable.selectedValue, {$set: selectedValue});
    console.log(newVariable);


    // console.log("variable", variable.selectedValue);
    // const updatedVariable = update(variable, {selectedValue: {$apply: function() {return selectedValue; }}});
    // variable = update(selectedValue: {$set: selectedValue}});
    // console.log("variable", variable.selectedValue);
    // variables = update(variables, {index: {$set: variable}});
    // variables = update(variables, {index: {$set: variable} selectedValue: {$set: selectedValue}}}});
    // console.log(variable.selectedValue);
    //
    // variables

    // this.forceUpdate();
  }

  /** @override */
  render() {
    return (
      <div className="mdl-card mdl-shadow--6dp">
        <div className="mdl-card__title" ref="myInput">
          <h2 className="mdl-card__title-text">Remixer</h2>
        </div>
        <div className="mdl-card__supporting-text mdl-card__actions mdl-card--border">
          <Overlay
            variables={this.props.variables}
            updateVariable={this.updateVariable}
          />
        </div>
      </div>
    );
  }
}

let variables = remixer.attachedInstance.variablesArray;
const overlayWrapper = document.getElementById(CSS.RMX_OVERLAY_WRAPPER);

function redraw(variable?: Variable): void {
  console.log("redraw");

  ReactDOM.render(
    <DOMController
      wrapperElement={overlayWrapper}
      variables={variables}
    />,
    overlayWrapper
  );
}

variables.forEach(variable => {
  variable.addCallback(redraw);
});


redraw();
// /**
//  * Renders the DOMController component to the overlay wrapper element.
//  */
// let element = document.getElementById(CSS.RMX_OVERLAY_WRAPPER);
// ReactDOM.render(
//   <div>
//     <DOMController
//       wrapperElement={element}
//       variables={remixer.attachedInstance.variablesArray}>
//     </DOMController>
//   </div>, element);
