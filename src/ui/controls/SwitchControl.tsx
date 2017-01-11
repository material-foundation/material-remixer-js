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
import { IBooleanControlProps } from "./controlProps";

/**
 * A switch control.
 * @class
 * @extends React.Component
 */
export class SwitchControl extends React.Component<IBooleanControlProps, void> {

  /** Handles the update event for this control. */
  onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { selectedValue } = this.props.variable;
    this.props.updateVariable(this.props.variable, !selectedValue);
  }

  /** @override */
  shouldComponentUpdate(nextProps: IBooleanControlProps) {
    console.log("shouldComponentUpdate", nextProps.variable.selectedValue, this.props.variable.selectedValue);
    return nextProps.variable !== this.props.variable;
  }

  /** @override */
  render() {
    const {
      title,
      key,
      selectedValue,
    } = this.props.variable;
    const id = `${CSS.RMX_SWITCH}-${key}`;

    return (
      <div className={`${CSS.RMX_SWITCH} ${CSS.MDL_LIST_ITEM}`}>
        <span className={CSS.MDL_PRIMARY}>{title}</span>
        <span className={CSS.MDL_SECONDARY}>
          <label
            className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
            htmlFor={id}
          >
            <input
              id={id} type="checkbox" className="mdl-switch__input"
              checked={selectedValue}
              onChange={this.onChange}
            />
            <span className="mdl-switch__label" />
          </label>
        </span>
      </div>
    );
  }
}
