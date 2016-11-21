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
import { ControlUpdateProps } from "../controls/controlProps";
import { CSS, VariableType } from "../../lib/Constants";
import { DropdownControl } from "../controls/DropdownControl";
import { RadioListControl } from "../controls/RadioListControl";
import { SliderControl } from "../controls/SliderControl";
import { StringVariable } from "../../core/variables/StringVariable";
import { SwitchControl } from "../controls/SwitchControl";
import { TextFieldControl } from "../controls/TextFieldControl";
import { Variable } from "../../core/variables/Variable";

/**
 * Interface for a React class that requires an array of Variables.
 * @interface
 * @extends ControlUpdateProps
 */
export interface OverlayVariables extends ControlUpdateProps {
  variables: Array<Variable>;
}

/**
 * Renders a list of remixer controls for each variable in an overlay card.
 *
 * @class
 * @extends React.Component
 */
export class Overlay extends React.Component<OverlayVariables, void> {

  /**
   * Returns a control as determined by the variable `dataType` property.
   * @param  {Variable} variable The variable to provide the control for.
   * @return {any} A control component.
   */
  controlForVariable(variable: Variable): any {
    switch (variable.dataType) {
      case VariableType.BOOLEAN:
        return SwitchControl;
      case VariableType.RANGE:
        return SliderControl;
      case VariableType.STRING:
        const { possibleValues } = variable as StringVariable;
        if (!possibleValues) {
          return TextFieldControl;
        } else if (possibleValues.length === 2) {
          return RadioListControl;
        } else {
          return DropdownControl;
        }
      case VariableType.NUMBER:
        return TextFieldControl;
      case VariableType.COLOR:
        return ColorSwatchControl;
    }
    return null;
  }

  /** @override */
  render() {
    return (
      <div className={CSS.MDL_LIST}>
        {this.props.variables.map(variable => {
          const Control = this.controlForVariable(variable);
          return (
            <Control
              variable={variable}
              updateVariable={this.props.updateVariable}
              key={variable.key}
            />
          );
        })}
      </div>
    );
  }
}
