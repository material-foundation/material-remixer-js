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
import { StringControlProps } from "./controlProps";

/**
 * A dropdown control.
 * @class
 * @extends React.Component
 */
export class DropdownControl
    extends React.Component<StringControlProps, { selectedValue: string; }> {

  state = {
    selectedValue: this.props.variable.selectedValue,
  };

  /** Handles the update event for this control. */
  handleUpdate = (event: any) => {
    const selectedValue = event.target.getAttribute("data");
    this.props.onUpdate(this.props.variable, selectedValue);
    this.setState({selectedValue: selectedValue});
  };

  /** @override */
  render() {
    const {
      title,
      key,
      possibleValues,
      selectedValue
    } = this.props.variable;
    const id = `${CSS.RMX_DROPDOWN}-${key}`;

    return (
      <div className={`${CSS.RMX_DROPDOWN} ${CSS.MDL_LIST_ITEM}`}>
        <span className={CSS.MDL_PRIMARY}>{title}</span>
        <span className={CSS.MDL_SECONDARY}>
          <button id={id} className="mdl-button mdl-js-button">
            <span>
              {selectedValue}<i className="material-icons">arrow_drop_down</i>
            </span>
          </button>
          <ul
            className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor={id}
          >
            {possibleValues.map((value: string) => (
              <li className="mdl-menu__item" key={value}
                onClick={this.handleUpdate}
                data={value}>{value}
              </li>
            ))}
          </ul>
        </span>
      </div>
    );
  }
}
