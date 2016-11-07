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
import { RangeVariable } from "../../core/variables/RangeVariable";

/**
 * A React component class that renders a slider component.
 * @class
 * @extends Component
 */
export class SliderComponent extends Component {

  /** @override */
  static numberOfLines: number = 2;

  /** @override */
  get id(): string {
    return `rmx-slider-${this.props.variable.key}`;
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
    let variable: RangeVariable = this.props.variable as RangeVariable;
    return (
      <div>
        <span className="rmx-mdl-slider-min-value">{variable.minValue}</span>
        <input id={this.id} type="range" className="mdl-slider mdl-js-slider"
          ref={this.id}
          min={variable.minValue} max={variable.maxValue} step={variable.increment}
          value={this.state.selectedValue}
          onChange={this.handleChange.bind(this)} />
        <span className="rmx-mdl-slider-max-value">{variable.maxValue}</span>
      </div>
    );
  }
}
