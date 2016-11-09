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

import * as React from "react";
import { ControlInterface } from "./ControlInterface";
import { CSS } from "../../lib/Constants";

/**
 * A switch control.
 * @class
 * @extends React.Component
 */
export class SwitchControl extends React.Component<ControlInterface, ControlInterface> {
  state = {
    variable: this.props.variable,
  };

  /**
   * Handles a click event on the switch.
   * @param {Event} event The click event.
   */
  handleClick(event: Event) {
    const { variable } = this.state;
    variable.selectedValue = !variable.selectedValue;
    this.setState({variable: variable});
  }

  /** @override */
  render() {
    const {
      title,
      key,
      selectedValue,
    } = this.state.variable;
    const id = `${CSS.RMX_SWITCH}-${key}`;

    return (
      <div className={`${CSS.RMX_SWITCH} ${CSS.MDL_LIST_ITEM}`}>
        <span className={CSS.MDL_PRIMARY}>{title}</span>
        <span className={CSS.MDL_SECONDARY}>
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
              htmlFor={id}>
            <input id={id} type="checkbox" className="mdl-switch__input"
              checked={selectedValue}
              onChange={this.handleClick.bind(this)} />
            <span className="mdl-switch__label"></span>
          </label>
        </span>
      </div>
    );
  }
}
