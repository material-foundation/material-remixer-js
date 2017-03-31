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
import { IStringControlProps } from './controlProps';

/**
 * A radio list control.
 * @class
 * @extends React.Component
 */
export class RadioListControl extends React.Component<IStringControlProps, void> {

  /** Array of MDL components. */
  radioItems: HTMLLabelElement[] = [];

  /** Handles the update event for this control. */
  onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.props.updateVariable(
      this.props.variable,
      (event.target as HTMLInputElement).value,
    );
  }

  /** @override */
  shouldComponentUpdate(nextProps: IStringControlProps) {
    return nextProps.variable !== this.props.variable;
  }

  componentDidUpdate() {
    const { limitedToValues, selectedValue } = this.props.variable;
    const index = limitedToValues.indexOf(selectedValue);
    const materialRadio = this.radioItems[index]['MaterialRadio'];
    materialRadio.check();
  }

  /** @override */
  render() {
    const {
      title,
      key,
      limitedToValues,
      selectedValue,
    } = this.props.variable;
    const id = `${CSS.RMX_RADIO_LIST_ITEM}-${key}`;

    return (
      <ListItem
        controlClass={CSS.RMX_RADIO_LIST}
        title={title}
        inlineControl={true}
      >
        {limitedToValues.map((value: string, i: number) => (
          <label
            className={`${CSS.RMX_RADIO_LIST_ITEM} mdl-radio mdl-js-radio mdl-js-ripple-effect`}
            htmlFor={`${id}-${i}`}
            key={value}
          >
            <input
              type='radio'
              id={`${id}-${i}`}
              className='mdl-radio__button'
              name='options'
              value={value}
              checked={selectedValue === value}
              onChange={this.onChange}
            />
            <span className='mdl-radio__label'>{value}</span>
          </label>
        ))}
      </ListItem>
    );
  }
}
