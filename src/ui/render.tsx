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

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/overlay.less';

import { remixer } from '../core/Remixer';
import { Variable } from '../core/variables/Variable';
import { CSS } from '../lib/Constants';
import { OverlayController } from './OverlayController';

// Get remixer variables from the current instance of remixer.
let variables = remixer.attachedInstance.variablesArray;

// The current instance of remixer remote.
const remote = remixer.attachedInstance.remote;

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
  remixer.cloneAndUpdateVariable(variable, selectedValue);
}

/** Toggles the enabled status of remote sharing. */
function toggleRemoteEnabled(): void {
  if (remote.isEnabled) {
    remote.stopSharing();
  } else {
    remote.startSharing();
  }
  redraw();
}

// Renders the OverlayController component to the overlay wrapper element.
const overlayWrapper = document.getElementById(CSS.RMX_OVERLAY_WRAPPER);
function redraw(): void {
  variables = remixer.attachedInstance.variablesArray;

  ReactDOM.render(
    <OverlayController
      remote={remote}
      toggleRemoteEnabled={toggleRemoteEnabled}
      updateVariable={updateVariable}
      variables={variables}
      wrapperElement={overlayWrapper}
    />,
    overlayWrapper,
  );
}

// Add `redraw()` as a callback when selected value changes on a variable.
variables.forEach((variable) => {
  variable.addCallback(redraw);
});

redraw();
