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
import { RangeVariable } from "../../core/variables/RangeVariable";

/**
 * A slider control.
 * @class
 * @extends React.Component
 */
export class SliderControl extends React.Component<ControlInterface, ControlInterface> {
  state = {
    variable: this.props.variable,
  };

  /**
   * Handles a change event for the slider.
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
      selectedValue,
      minValue,
      maxValue,
      increment,
    } = this.state.variable as RangeVariable;
    const id = `${CSS.RMX_SLIDER}-${key}`;

    return (
      <div className={`${CSS.RMX_SLIDER} ${CSS.MDL_LIST_ITEM} ${CSS.MDL_TWO_LINE}`}>
        <span className={CSS.MDL_PRIMARY}>
          <span>{title}
            <span className={CSS.RMX_SELECTED_VALUE}>{selectedValue}</span>
          </span>
          <span className={CSS.MDL_SECONDARY}>
            <span className={CSS.RMX_SLIDER_MIN}>{minValue}</span>
            <input id={id} type="range" className="mdl-slider mdl-js-slider"
              min={minValue} max={maxValue} step={increment}
              value={selectedValue}
              onChange={this.handleChange.bind(this)} />
            <span className={CSS.RMX_SLIDER_MAX}>{maxValue}</span>
          </span>
        </span>
      </div>
    );
  }
}
