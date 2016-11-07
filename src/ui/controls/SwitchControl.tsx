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
import { CSS } from "../../lib/Constants";
import { ControlInterface } from "./ControlInterface";

export class SwitchControl extends React.Component<ControlInterface, ControlInterface> {
  state = {
    variable: this.props.variable,
  };

  /**
   * Handles a click event on this component.
   * @param {Event} event The click event.
   */
  handleClick(event: Event) {
    let variable = this.state.variable;
    variable.selectedValue = !this.state.variable.selectedValue;
    this.setState({variable: variable});
  }

  /** @override */
  render() {
    let id = `${CSS.RMX_SWITCH}-${this.props.variable.key}`;
    let selectedValue = this.state.variable.selectedValue as boolean;

    return (
      <li className={`${CSS.MDL_LIST_ITEM} ${CSS.RMX_SWITCH}`}>
        <span className={CSS.MDL_PRIMARY}>
          {this.props.variable.title}
        </span>
        <span className={CSS.MDL_SECONDARY}>
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id}>
            <input id={id} type="checkbox" className="mdl-switch__input"
              checked={selectedValue}
              onChange={this.handleClick.bind(this)} />
            <span className="mdl-switch__label"></span>
          </label>
        </span>
      </li>
    );
  }
}
