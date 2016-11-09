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
import { CSS, VariableType } from "../../lib/Constants";
import { StringVariable } from "../../core/variables/StringVariable";

/**
 * A textfield control.
 * @class
 * @extends React.Component
 */
export class TextFieldControl extends React.Component<ControlInterface, ControlInterface> {
  state = {
    variable: this.props.variable,
  };

  /**
   * Handles a change event for the textfield.
   * @param {Event} event The change event.
   */
  handleChange(event: Event) {
    const { variable } = this.state;
    variable.selectedValue = (event.target as any).value;
    this.setState({variable: variable});
  }

  /** @override */
  render() {
    const {
      title,
      key,
      dataType,
      selectedValue
    } = this.state.variable as StringVariable;
    const id = `${CSS.RMX_TEXTFIELD}-${key}`;
    const isNumber: boolean = dataType === VariableType.NUMBER;
    const pattern = isNumber ? "-?[0-9]*(\.[0-9]+)?" : ".*";

    return (
      <div className={`${CSS.RMX_TEXTFIELD} ${CSS.MDL_LIST_ITEM} ${CSS.MDL_TWO_LINE}`}>
        <span className={CSS.MDL_PRIMARY}>{title}
          <span className={`${CSS.MDL_SECONDARY} mdl-textfield mdl-js-textfield`}>
            <input className="mdl-textfield__input" type="text" id={id}
              pattern={pattern}
              value={selectedValue}
              onChange={this.handleChange.bind(this)} />
            <label className="mdl-textfield__label"
              htmlFor={id}>{`Enter ${isNumber ? "number" : "text"}...`}</label>
            <span className="mdl-textfield__error">Input is not a number!</span>
          </span>
        </span>
      </div>
    );
  }
}
