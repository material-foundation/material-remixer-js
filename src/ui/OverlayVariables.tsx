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

import { CSS, VariableDataType } from "../lib/Constants";
import { ColorSwatchControl } from "./controls/ColorSwatchControl";
import { DropdownControl } from "./controls/DropdownControl";
import { IControlUpdateProps } from "./controls/controlProps";
import { RadioListControl } from "./controls/RadioListControl";
import { SliderControl } from "./controls/SliderControl";
import { StringVariable } from "../core/variables/StringVariable";
import { SwitchControl } from "./controls/SwitchControl";
import { TextFieldControl } from "./controls/TextFieldControl";
import { Variable } from "../core/variables/Variable";

/**
 * Interface for a React class that requires an array of Variables.
 * @interface
 * @extends IControlUpdateProps
 */
export interface IOverlayVariableProps extends IControlUpdateProps {
  variables: Variable[];
}

/**
 * Renders a list of remixer controls for each variable.
 *
 * @class
 * @extends React.Component
 */
export class OverlayVariables extends React.Component<IOverlayVariableProps, void> {

  /** @override */
  render() {
    return (
      <div className={CSS.MDL_LIST}>
        {this.props.variables.map((variable) => {
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

  /**
   * Returns a control as determined by the variable `dataType` property.
   * @private
   * @param  {Variable} variable The variable to provide the control for.
   * @return {any} A control component.
   */
  private controlForVariable(variable: Variable): any {
    switch (variable.dataType) {
      case VariableDataType.BOOLEAN:
        return SwitchControl;
      case VariableDataType.RANGE:
        return SliderControl;
      case VariableDataType.STRING:
        const { possibleValues } = variable as StringVariable;
        if (possibleValues.length === 0) {
          return TextFieldControl;
        } else if (possibleValues.length === 2) {
          return RadioListControl;
        } else {
          return DropdownControl;
        }
      case VariableDataType.NUMBER:
        return TextFieldControl;
      case VariableDataType.COLOR:
        return ColorSwatchControl;
      default:
        return null;
    }
  }
}
