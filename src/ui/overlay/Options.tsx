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
import { OverlayVariables } from "./Overlay";

/**
 * A React component class that renders a list of configurable options.
 * @class
 * @extends React.Component
 */
export class Options extends React.Component<OverlayVariables, OverlayVariables> {

  /**
   * Default constructor.
   * @constructor
   * @type {Options}
   */
  constructor(props: OverlayVariables) {
    super(props);
    this.state = {variables: props.variables};
  }

  /**
   * Handles the click events.
   * @param {Event} event The received event.
   */
  handleClick(event: Event) {
    this.state.variables.forEach(variable => {
      variable.restore();
    });
    this.forceUpdate();
  }

  /** @override */
  render() {
    return (
      <ul className="demo-list-two mdl-list">
        <li className="mdl-list__item">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
             onClick={this.handleClick.bind(this)}>
            Restore Defaults
          </a>
        </li>
      </ul>
    );
  }
}
