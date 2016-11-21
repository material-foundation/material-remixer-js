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
import { CSS } from "../lib/Constants";
import { Variable } from "../core/variables/Variable";
import { DOMController } from "./DOMController";
import { remixer } from "../core/Remixer";

/**
 * Handles all control updates by setting a new selected value for the
 * variable.
 *
 * To maintain immutability for React, lets first clone the variable,
 * update its selected value, then set it back to the variables array.
 * Doing so allows each control to handle its own `shouldComponentUpdate`
 * method to determine if it should be re-rendered.
 *
 * @param {Variable} variable The variable to update.
 * @param {any} selectedValue The new selected value.
 */
function updateVariable(variable: Variable, selectedValue: any): void {
  const index = variables.indexOf(variable);
  let clonedVariable = variable.clone();
  clonedVariable.selectedValue = selectedValue;
  variables[index] = clonedVariable;
}

let variables = remixer.attachedInstance.variablesArray;
const overlayWrapper = document.getElementById(CSS.RMX_OVERLAY_WRAPPER);

/** Renders the DOMController component to the overlay wrapper element. */
function redraw(): void {
  ReactDOM.render(
    <DOMController
      wrapperElement={overlayWrapper}
      variables={variables}
      updateVariable={updateVariable}
    />,
    overlayWrapper
  );
}

// Add `redraw()` as a callback when selected value changes on a variable.
variables.forEach(variable => {
  variable.addCallback(redraw);
});

redraw();
