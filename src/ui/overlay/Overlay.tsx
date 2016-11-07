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

// import { ComponentFactory } from "../controls/componentFactory";
import { ControlInterface } from "./ControlInterface";
import { Variable } from "../../core/variables/Variable";
import { SwitchControl } from "../controls/SwitchControl";

/**
 * Interface for a React class that requires an array of Variables.
 * @interface
 */
export interface OverlayVariables {
  variables: Array<Variable>;
}

/**
 * A React component class that renders a list of inner components.
 *
 * Consists of a `ul` element containing a list of remixer control components
 * generated from the ComponentFactory.
 *
 * @class
 * @extends React.Component
 */
export class Overlay extends React.Component<OverlayVariables, OverlayVariables> {
  state = {
    variables: this.props.variables,
  };

  controlForVariable(variable: Variable): ControlInterface {
    return SwitchControl;
  }

  /**
   * Renders the component via React.
   * @override
   */
  render() {

    // let classNames: string = `mdl-list__item ${(controlLineCount > 1) ? "mdl-list__item--two-line" : ""}`;

    return (
      <ul className="rmx-list-control mdl-list">
        {this.state.variables.map((variable) => (
          /*<ComponentFactory variable={variable} key={variable.key} />*/
          /*<li><VariableControl variable={variable} key={variable.key} /></li>*/
          /*<li className="mdl-list__item" key={variable.key}>{this.controlForVariable(variable)}</li>*/
          console.log("ok")
          let RemixerControl = this.controlForVariable(variable);
          <RemixerControl variable={variable} key={variable.key} />
          /*this.controlForVariable(variable)*/
        ))}
      </ul>
    );
  }
}
