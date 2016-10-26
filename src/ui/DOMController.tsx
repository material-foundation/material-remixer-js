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

import "./overlay/styles.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Constants as CONST } from "../lib/Constants";
import { Messaging } from "../lib/Messaging";
import { Options } from "./overlay/Options";
import { Overlay } from "./overlay/Overlay";
import { Variable } from "../core/variables/Variable";
import { remixer } from "../core/Remixer";

/**
 * Interface for the properties assigned to the DOMController component.
 * @interface
 */
interface ControllerProps {
  wrapperElement: HTMLElement;
}

/**
 * Interface for the state of the DOMController component.
 * @interface
 */
interface ControllerState {
  /**
   * The DOMController will render a control component for each of the variables
   * of this array.
   * @type {Array<Variable>}
   */
  variables?: Array<Variable>;

  /**
   * The current route to render.
   * @type {Route}
   */
  route?: Route;
}

/**
 * Available routes to render.
 */
enum Route {
  Variables,
  Options
}

/**
 * A React component class that renders an MDL-styled card containing child
 * components determined by its current Route.
 *
 * Depending on the Route, the card content can be either:
 *   1) The overlay with configurable control components per assigned Variables.
 *   2) An options page used to configure Remixer session properties.
 *
 * @class
 * @extends React.Component
 */
export class DOMController extends React.Component<ControllerProps, ControllerState> {

  /**
   * Default constructor.
   * @constructor
   * @type {DOMController}
   */
  constructor(props: ControllerProps) {
    super(props);
    this.state = {variables: remixer.attachedInstance.variablesArray, route: Route.Variables};
  }

  /**
   * The component will mount. Lets register for messaging and key events.
   * @override
   */
  componentDidMount() {
    Messaging.register(this.onMessageReceived.bind(this));
    this.addKeyListener();
  }

  /**
   * The component will unmount. Lets unregister.
   * @override
   */
  componentWillUnmount() {
    Messaging.unregister();
    this.removeKeyListener();
  }

  /**
   * Handles receiving of window message.
   * @param {MessageEvent} event The received message event.
   */
  onMessageReceived(event: MessageEvent): void {
    if (event.data === Messaging.type.ToggleVisibility) {
      this.toggleVisibility();
    }
  }

  /** Adds a key listener. */
  addKeyListener(): void {
    document.addEventListener(CONST.KEY_EVENT_DOWN, (e: KeyboardEvent) => {
      if (e.keyCode === CONST.KEY_CODE_ESC) {
        this.toggleVisibility();
      }
    });
  }

  /** Removes a key listener. */
  removeKeyListener(): void {
    document.removeEventListener(CONST.KEY_EVENT_DOWN);
  }

  /** Toggles the Remixer overlay visibility. */
  toggleVisibility() {
    this.props.wrapperElement.classList.toggle(CONST.CSS_CLASS_VISIBLE);
  }

  /**
   * Updates the state to new route.
   * @param {Event} event The route to update to.
   */
  updateRoute(event: Event) {
    const currentRoute = this.state.route;
    this.setState({
        route: currentRoute === Route.Variables
          ? Route.Options
          : Route.Variables
    });
  }

  /**
   * Renders the component via React.
   * @override
   */
  render() {
    const CurrentRoute = this.state.route === Route.Options ? Options : Overlay;
    return (
      <div className="rmx-card-wide mdl-card mdl-shadow--6dp">
        <div className="mdl-card__title" ref="myInput">
          <h2 className="mdl-card__title-text">Remixer</h2>

        </div>
        <div className="mdl-card__menu">
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            onClick={this.updateRoute.bind(this)}>
              <i className="material-icons">menu</i>
          </button>
        </div>
        <div className="mdl-card__supporting-text mdl-card__actions mdl-card--border">
          <CurrentRoute variables={this.state.variables} />
        </div>
      </div>
    );
  }
}

/**
 * Renders the DOMController component to the overlay wrapper element.
 */
let element = document.getElementById(CONST.ID_OVERLAY_WRAPPER);
ReactDOM.render(<div><DOMController wrapperElement={element} /></div>, element);
