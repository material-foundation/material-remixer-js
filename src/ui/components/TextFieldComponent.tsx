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
import { Component } from "./Component";
import { Constants as CONST } from "../../lib/Constants";
import { Variable } from "../../core/variables/Variable";

/**
 * A React component class that renders a text field component.
 * @class
 * @extends Component
 */
export class TextFieldComponent extends Component {

  /** @override */
  static numberOfLines: number = 2;

  /** @override */
  get id(): string {
    return `rmx-textfield-${this.props.variable.key}`;
  }

  /**
   * Handles a change event on this component.
   * @param {Event} event The change event.
   */
  handleChange(event: Event) {
    this.updateSelectedValue(event.target["value"]);
  }

  /** @override */
  render() {
    let variable: Variable = this.props.variable;
    let isNumber: boolean = variable.dataType === CONST.VARIABLE_TYPE_NUMBER;
    let pattern = isNumber ? "-?[0-9]*(\.[0-9]+)?" : ".*";
    return (
      <div className="mdl-textfield mdl-js-textfield" ref={this.id}>
        <input className="mdl-textfield__input" type="text" id={this.id}
          pattern={pattern}
          value={this.state.selectedValue}
          onChange={this.handleChange.bind(this)} />
        <label className="mdl-textfield__label"
          htmlFor={this.id}>Enter {variable.dataType}...</label>
        <span className="mdl-textfield__error">Input is not a number!</span>
      </div>
    );
  }
}
