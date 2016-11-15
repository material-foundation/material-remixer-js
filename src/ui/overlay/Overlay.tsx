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
import { ColorSwatchControl } from "../controls/ColorSwatchControl";
import { DropdownControl } from "../controls/DropdownControl";
import { RadioListControl } from "../controls/RadioListControl";
import { SliderControl } from "../controls/SliderControl";
import { SwitchControl } from "../controls/SwitchControl";
import { TextFieldControl } from "../controls/TextFieldControl";
import { Variable } from "../../core/variables/Variable";
import { VariableType } from "../../lib/Constants";

/**
 * Interface for a React class that requires an array of Variables.
 * @interface
 */
export interface OverlayVariables { variables: Array<Variable>; }

/**
 * Renders a list of remixer controls for each variable in an overlay card.
 *
 * @class
 * @extends React.Component
 */
export class Overlay extends React.Component<OverlayVariables, OverlayVariables> {
  state = {
    variables: this.props.variables,
  };

  /**
   * Returns a control as determined by the variable `dataType` property.
   * @param  {Variable} variable The variable to provide the control for.
   * @return {any} A control component.
   */
  controlForVariable(variable: Variable): any {
    let Control: any = null;
    switch (variable.dataType) {
      case VariableType.BOOLEAN:
        Control = SwitchControl;
        break;
      case VariableType.RANGE:
        Control = SliderControl;
        break;
      case VariableType.STRING:
        if (!variable["possibleValues"]) {
          Control = TextFieldControl;
        } else if (variable["possibleValues"].length === 2) {
          Control = RadioListControl;
        } else {
          Control = DropdownControl;
        }
        break;
      case VariableType.NUMBER:
        Control = TextFieldControl;
        break;
      case VariableType.COLOR:
        Control = ColorSwatchControl;
        break;
    }
    return <Control variable={variable} key={variable.key} />;
  }

  /** @override */
  render() {
    return (
      <div className="rmx-list-control mdl-list">
        {this.state.variables.map((variable) => (
          this.controlForVariable(variable)
        ))}
      </div>
    );
  }
}
