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
import { ComponentFactory, ComponentProps } from "./ComponentFactory";

/**
 * Interface for a Component class.
 * @interface
 */
interface ComponentType {
  id: string;
  updateSelectedValue(newValue: any): void;
}

/**
 * Interface for the state of a Component class.
 * @interface
 */
interface ComponentState {
  selectedValue: any;
}

/**
 * Provides a declaration to upgrade MDL elements when created dynamically.
 */
interface ComponentHandler {
  upgradeElement(element: any): void;
}

declare const componentHandler: ComponentHandler;

/**
 * A React component class that Remixer control components should subclass.
 * @class
 * @extends React.Component
 * @implements Component
 */
export class Component extends React.Component<ComponentProps, ComponentState> implements ComponentType {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {selectedValue: props.variable.selectedValue};
  }

  /**
   * Number of lines to render this component. Defaults to 1.
   * @override
   * @static
   * @type {number}
   */
  static numberOfLines: number = 1;

  /**
   * The HTML id for this component. Subclasses should override and provide a
   * unique id in the form of `rmx-{component-name}-key`.
   *
   * As an example: rmx-switch-title.
   *
   * @readonly.
   * @return {string} The HTML element ID.
   */
  id: string;

  /**
   * The component will mount. Dynamicly generate MDL elements require
   * calling `upgradeElement` for each component.
   * @override
   */
  componentDidMount() {
    for (let key in this.refs) {
      componentHandler.upgradeElement(this.refs[key]);
    }
  }

  /**
   * Updates the state and selected value.
   * @param {any} newValue The new value to update to.
   */
  updateSelectedValue(newValue: any) {
    this.setState({selectedValue: newValue});
    this.props.variable.selectedValue = newValue;
  }
}
