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

/**
 * A React component class that renders a radio list component.
 * @class
 * @extends Component
 */
export class RadioListComponent extends Component {

  /** @override */
  get id(): string {
    return `rmx-radio-${this.props.variable.key}`;
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
    let possibleValues: Array<string> = this.props.variable["possibleValues"];
    let selectedValue: string = this.state.selectedValue;

    // Ensure selected value is choosable from possible values.
    if (possibleValues.indexOf(selectedValue) === -1) {
      possibleValues.push(selectedValue);
    };

    return (
      <div>
        {possibleValues.map((value: string, i: number) => (
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
              htmlFor={this.id + "-" + i}
              key={this.id + "-" + i}
              ref={this.id + "-" + value}>
            <input type="radio" id={this.id + "-" + i} className="mdl-radio__button"
              name="options" value={value}
              checked={selectedValue === value}
              onChange={this.handleChange.bind(this)} />
            <span className="mdl-radio__label">{value}</span>
          </label>
        ))}
      </div>
    );
  }
}
