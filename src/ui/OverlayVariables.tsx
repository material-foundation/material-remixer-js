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

import * as React from 'react';

import { StringVariable } from '../core/variables/StringVariable';
import { Variable } from '../core/variables/Variable';
import { ControlType, CSS } from '../lib/Constants';
import { ColorSwatchControl } from './controls/ColorSwatchControl';
import { IControlUpdateProps } from './controls/controlProps';
import { DropdownControl } from './controls/DropdownControl';
import { RadioListControl } from './controls/RadioListControl';
import { SliderControl } from './controls/SliderControl';
import { SwitchControl } from './controls/SwitchControl';
import { TextFieldControl } from './controls/TextFieldControl';

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
      <div>
        {this.props.variables.map((variable) => {
          const Control = this.controlForVariable(variable);
          if (Control) {
            return (
              <Control
                variable={variable}
                updateVariable={this.props.updateVariable}
                key={variable.key}
              />
            );
          }
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
    // TODO(cjcox): Provide support for controls:
    // BUTTON, COLOR_INPUT, STEPPER
    switch (variable.controlType) {
      case ControlType.COLOR_LIST:
        return ColorSwatchControl;
      case ControlType.SEGMENTED:
        return RadioListControl;
      case ControlType.SLIDER:
        return SliderControl;
      case ControlType.SWITCH:
        return SwitchControl;
      case ControlType.TEXT_INPUT:
        return TextFieldControl;
      case ControlType.TEXT_LIST:
        return DropdownControl;
      default:
        return null;
    }
  }
}
