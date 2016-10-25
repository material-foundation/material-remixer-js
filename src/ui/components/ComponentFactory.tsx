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
import { Constants as CONST } from "../../lib/Constants";
import { ColorSwatchComponent } from "./ColorSwatchComponent";
import { DropdownComponent } from "./DropdownComponent";
import { RadioListComponent } from "./RadioListComponent";
import { SliderComponent } from "./SliderComponent";
import { SwitchComponent } from "./SwitchComponent";
import { TextFieldComponent } from "./TextFieldComponent";
import { Variable, VariableListType } from "../../core/variables/Variable";

/**
 * Interface for the properties of a Component class.
 * @interface
 */
export interface ComponentProps { variable: Variable; }

/**
 * A React component class that generates control components.
 * @class
 * @extends React.Component
 */
export class ComponentFactory extends React.Component<ComponentProps, void>  {

  /**
   * Renders the appropriate control component as determined by the Variable
   * property.
   * @override
   */
  render() {
    let controlComponent: JSX.Element = null;
    let variable: Variable = this.props.variable;

    // Determine which type of component to render based on data type and content.
    switch (variable.dataType) {
      case CONST.VARIABLE_TYPE_BOOLEAN:
        controlComponent = <SwitchComponent variable={variable} />;
        break;
      case CONST.VARIABLE_TYPE_RANGE:
        controlComponent = <SliderComponent variable={variable} />;
        break;
      case CONST.VARIABLE_TYPE_STRING:
        if (!variable["possibleValues"]) {
          controlComponent = <TextFieldComponent variable={variable} />;
        } else if (variable["possibleValues"].length <= 2) {
          controlComponent = <RadioListComponent variable={variable} />;
        } else {
          controlComponent = <DropdownComponent variable={variable} />;
        }
        break;
      case CONST.VARIABLE_TYPE_NUMBER:
        controlComponent = <TextFieldComponent variable={variable} />;
        break;
      case CONST.VARIABLE_TYPE_COLOR:
        controlComponent = <ColorSwatchComponent variable={variable} />;
        break;
    }

    let controlElement: JSX.Element =
        <div className="mdl-list__item-secondary-action">{controlComponent}</div>;
    let controlLineCount: number = controlComponent.type["numberOfLines"];
    let classNames: string = `mdl-list__item ${(controlLineCount > 1) ? "mdl-list__item--two-line" : ""}`;

    return (
      <li className={classNames}>
        <div className="mdl-list__item-primary-content">
          {variable.title}
          {(controlLineCount > 1) ? controlElement : ""}
        </div>
        {(controlLineCount === 1) ? controlElement : ""}
      </li>
    );
  }
}
