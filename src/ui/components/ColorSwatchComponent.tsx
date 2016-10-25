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
 * A React component class that renders a color swatch picker component.
 * @class
 * @extends Component
 */
export class ColorSwatchComponent extends Component {

  /** @override */
  static numberOfLines: number = 2;

  /** @override */
  get id(): string {
    return `rmx-swatch-${this.props.variable.key}`;
  }

  /**
   * Handles a click event on this component.
   * @param {string} value The new selectedValue.
   */
  handleClick(value: string) {
    this.updateSelectedValue(value);
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
          <div className="rmx-color-item" style={ {backgroundColor: value} }
            value={value} key={this.id + "-" + i} ref={value}
            onClick={this.handleClick.bind(this, value)} data={value}>
              { (selectedValue === value) ? <i className="material-icons">check</i> : "" }
          </div>
        ))}
      </div>
    );
  }
}
