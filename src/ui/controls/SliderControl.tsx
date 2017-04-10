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

import { CSS } from '../../lib/Constants';
import { ListItem } from '../ListItem';
import { IRangeControlProps } from './controlProps';

/**
 * A slider control.
 * @class
 * @extends React.Component
 */
export class SliderControl extends React.Component<IRangeControlProps, void> {

  /** Handles the update event for this control. */
  onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.props.updateVariable(
      this.props.variable,
      parseFloat((event.target as HTMLInputElement).value),
    );
  }

  /** @override */
  shouldComponentUpdate(nextProps: IRangeControlProps) {
    return nextProps.variable !== this.props.variable;
  }

  /** @override */
  render() {
    const {
      title,
      key,
      selectedValue,
      minValue,
      maxValue,
      increment,
    } = this.props.variable;
    const id = `${CSS.RMX_SLIDER}-${key}`;

    return (
      <ListItem
        controlClass={CSS.RMX_SLIDER}
        title={title}
        subtitle={selectedValue}
        inlineControl={false}
      >
        <div>
          <span className={CSS.RMX_SLIDER_MIN}>{minValue}</span>
          <input
            id={id}
            type='range'
            className='mdl-slider mdl-js-slider'
            min={minValue}
            max={maxValue}
            step={increment}
            value={selectedValue}
            onChange={this.onChange}
          />
          <span className={CSS.RMX_SLIDER_MAX}>{maxValue}</span>
        </div>
      </ListItem>
    );
  }
}
