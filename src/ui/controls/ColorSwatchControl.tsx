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
import { ColorControlInterface } from "./controlInterfaces";
import { ColorVariable } from "../../core/variables/ColorVariable";
import { CSS, VariableType } from "../../lib/Constants";

/**
 * Interface containing properties for a single color swatch.
 * @interface
 */
interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: any;
}

/**
 * Returns a single color swatch displayed within the `ColorSwatchControl`.
 * @param {ColorSwatchProps} props The color swath properties.
 */
function ColorSwatch(props: ColorSwatchProps) {
  const { color, isSelected, onClick } = props;
  return (
    <div className={CSS.RMX_COLOR_SWATCH_ITEM} style={{backgroundColor: color}}
     value={color} onClick={onClick}>
     {isSelected ? <i className="material-icons">check</i> : ""}
   </div>
 );
}

/**
 * A color swatch picker control consisting of a single color swatch for each
 * possible value.
 * @class
 * @extends React.Component
 */
export class ColorSwatchControl extends React.Component<ColorControlInterface, ColorControlInterface> {
  state = {
    variable: this.props.variable,
  };

  /** @override */
  componentWillMount() {
    // Add the selected value to possible values array if doesn't exsit.
    const {
      possibleValues,
      selectedValue
    } = this.state.variable;

    if (possibleValues.indexOf(selectedValue) === -1) {
      possibleValues.push(selectedValue);
      this.updateSelectedColor(selectedValue);
    };
  }

  /**
   * Handles updating the selected color when swatch is selected.
   * @param {string} value The new selected color value.
   */
  updateSelectedColor(color: string) {
    const { variable } = this.state;
    variable.selectedValue = color;
    this.setState({variable: variable});
  }

  /** @override */
  render() {
    const {
      title,
      possibleValues,
      selectedValue
    } = this.state.variable;

    return (
      <div className={`${CSS.RMX_COLOR_SWATCH} ${CSS.MDL_LIST_ITEM} ${CSS.MDL_TWO_LINE}`}>
        <span className={CSS.MDL_PRIMARY}>
          <span>{title}
            <span className={CSS.RMX_SELECTED_VALUE}>{selectedValue}</span>
          </span>
          <span className={CSS.MDL_SECONDARY}>
            {possibleValues.map((value: string) => (
              <ColorSwatch color={value} key={value}
                isSelected={selectedValue === value}
                onClick={this.updateSelectedColor.bind(this, value)} />
            ))}
          </span>
        </span>
      </div>
    );
  }
}
