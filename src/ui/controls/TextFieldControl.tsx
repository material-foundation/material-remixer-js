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
import { CSS, VariableType } from "../../lib/Constants";
import { StringControlProps } from "./controlProps";

/**
 * A textfield control.
 * @class
 * @extends React.Component
 */
export class TextFieldControl
    extends React.Component<StringControlProps, { selectedValue: string | number; }> {

  state = {
    selectedValue: this.props.variable.selectedValue,
  };

  /** Handles the update event for this control. */
  handleUpdate = (event: any) => {
    const selectedValue = event.target.value;
    this.props.onUpdate(this.props.variable, selectedValue);
    this.setState({selectedValue: selectedValue});
  };

  /** @override */
  render() {
    const {
      title,
      key,
      dataType,
      selectedValue
    } = this.props.variable;
    const id = `${CSS.RMX_TEXTFIELD}-${key}`;
    const isNumber: boolean = dataType === VariableType.NUMBER;
    const pattern = isNumber ? "-?[0-9]*(\.[0-9]+)?" : ".*";

    return (
      <div className={`${CSS.RMX_TEXTFIELD} ${CSS.MDL_LIST_ITEM} ${CSS.MDL_TWO_LINE}`}>
        <span className={CSS.MDL_PRIMARY}>{title}
          <span className={`${CSS.MDL_SECONDARY} mdl-textfield mdl-js-textfield`}>
            <input className="mdl-textfield__input" type="text"
              id={id}
              pattern={pattern}
              value={selectedValue}
              onChange={this.handleUpdate}
            />
            <label className="mdl-textfield__label" htmlFor={id}>
              {`Enter ${isNumber ? "number" : "text"}...`}
            </label>
            <span className="mdl-textfield__error">Input is not a number!</span>
          </span>
        </span>
      </div>
    );
  }
}
