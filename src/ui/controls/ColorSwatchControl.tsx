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
import * as TinyColor from "tinycolor2";

import { CSS } from "../../lib/Constants";
import { IColorControlProps } from "./controlProps";

/**
 * A color swatch picker control consisting of a single color swatch for each
 * allowed value.
 * @class
 * @extends React.Component
 */
export class ColorSwatchControl extends React.Component<IColorControlProps, void> {

  /** Handles the update event for this control. */
  onClick = (event: React.FormEvent<HTMLElement>): void => {
    let value = (event.target as HTMLElement).dataset["value"];
    if (value) {
      this.props.updateVariable(this.props.variable, value);
    }
  }

  /** @override */
  shouldComponentUpdate(nextProps: IColorControlProps) {
    return nextProps.variable !== this.props.variable;
  }

  /** @override */
  render() {
    const {
      title,
      limitedToValues,
      selectedValue,
    } = this.props.variable;

    return (
      <div className={`${CSS.RMX_COLOR_SWATCH} ${CSS.MDL_LIST_ITEM} ${CSS.MDL_TWO_LINE}`}>
        <span className={CSS.MDL_PRIMARY}>
          <span>{title}
            <span className={CSS.RMX_SELECTED_VALUE}>
              {TinyColor(selectedValue).toString()}
            </span>
          </span>
          <span className={CSS.MDL_SECONDARY}>
            {limitedToValues.map((value: string) => (
              <ColorSwatch color={value} key={value}
                isSelected={
                  TinyColor(selectedValue).toRgbString() ===
                    TinyColor(value).toRgbString()
                }
                onClick={this.onClick}
              />
            ))}
          </span>
        </span>
      </div>
    );
  }
}

/**
 * Interface containing properties for a single color swatch.
 * @interface
 */
interface IColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: any;
}

/**
 * Returns a single color swatch displayed within the `ColorSwatchControl`.
 * @param {IColorSwatchProps} props The color swatch properties.
 */
function ColorSwatch(props: IColorSwatchProps) {
  const {
    color,
    isSelected,
    onClick,
  } = props;
  // Determine a readable color to prevent a white checkmark on a light
  // color swatch.
  let readableCheckColors = [TinyColor("white"), TinyColor("gray")];
  let checkColor = TinyColor.mostReadable(TinyColor(color), readableCheckColors);
  return (
    <div
      className={CSS.RMX_COLOR_SWATCH_ITEM}
      style={{backgroundColor: color}}
      data-value={color}
      onClick={onClick}
    >
      {
        isSelected ? <i className="material-icons" style={{color: checkColor}}>check</i> : ""
      }
    </div>
  );
}
