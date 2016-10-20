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
 * A React component class that renders a toggle switch component.
 * @class
 * @extends Component
 */
export class SwitchComponent extends Component {

  /** @override */
  get id(): string {
    return `rmx-switch-${this.props.variable.key}`;
  }

  /** @override */
  componentWillReceiveProps() {
    // We will manually need to update the MDL component here to new state
    // when receiving new props.
    let selectedValue = this.props.variable.selectedValue;
    let component = this.refs[this.id]["MaterialSwitch"];
    this.state = {selectedValue: selectedValue};
    if (component) {
      selectedValue ? component.on() : component.off();
    }
  }

  /**
   * Handles a click event on this component.
   * @param {Event} event The click event.
   */
  handleClick(event: Event) {
    this.updateSelectedValue(!this.state.selectedValue);
  }

  /** @override */
  render() {
    return (
      <label ref={this.id} className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={this.id}>
        <input id={this.id} type="checkbox" className="mdl-switch__input"
          checked={this.state.selectedValue}
          onChange={this.handleClick.bind(this)} />
        <span className="mdl-switch__label"></span>
      </label>
    );
  }
}
