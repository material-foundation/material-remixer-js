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
import { StringVariable } from "../../core/variables/StringVariable";

export class DropdownControl extends React.Component<ControlInterface, ControlInterface> {
  state = {
    variable: this.props.variable,
  };

  // @override */
  componentWillMount() {
    // Add the selected value to possible values array if doesn't exsit.
    const {
      possibleValues,
      selectedValue
    } = this.state.variable as StringVariable;

    if (possibleValues.indexOf(selectedValue) === -1) {
      possibleValues.push(selectedValue);
      this.updatedSelectedValue(selectedValue);
    };
  }

  /**
   * Updates the variable with new selectedValue.
   * @param {string} value The new selectedValue.
   */
  updatedSelectedValue(value: string) {
    const { variable } = this.state;
    variable.selectedValue = value;
    this.setState({variable: variable});
  }

  /** @override */
  render() {
    const {
      title,
      key,
      possibleValues,
      selectedValue
    } = this.state.variable as StringVariable;
    const id = `${CSS.RMX_DROPDOWN}-${key}`;

    return (
      <div className={`${CSS.RMX_DROPDOWN} ${CSS.MDL_LIST_ITEM}`}>
        <span className={CSS.MDL_PRIMARY}>{title}</span>
        <span className={CSS.MDL_SECONDARY}>
          <button id={id} className="mdl-button mdl-js-button">
            <span>{selectedValue}<i className="material-icons">arrow_drop_down</i></span>
          </button>
          <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              htmlFor={id}>
            {possibleValues.map((value: string, i: number) => (
              <li className="mdl-menu__item" key={id + "-" + i}
                onClick={this.updatedSelectedValue.bind(this, value)}
                data={value}>{value}
              </li>
            ))}
          </ul>
        </span>
      </div>
    );
  }
}
