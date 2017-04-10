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

import { CSS, DataType } from '../../lib/Constants';
import { ListItem } from '../ListItem';
import { IStringControlProps } from './controlProps';

/**
 * A textfield control.
 * @class
 * @extends React.Component
 */
export class TextFieldControl extends React.Component<IStringControlProps, void> {

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

  /** @override */
  render() {
    const {
      title,
      key,
      dataType,
      selectedValue,
    } = this.props.variable;
    const id = `${CSS.RMX_TEXTFIELD}-${key}`;
    const isNumber: boolean = dataType === DataType.NUMBER;
    const pattern = isNumber ? '-?[0-9]*(\.[0-9]+)?' : '.*';

    return (
      <ListItem
        controlClass={CSS.RMX_TEXTFIELD}
        title={title}
        inlineControl={false}
      >
        <span className='mdl-textfield mdl-js-textfield'>
          <input
            className='mdl-textfield__input'
            type='text'
            id={id}
            pattern={pattern}
            value={selectedValue}
            onChange={this.onChange}
          />
          <label className='mdl-textfield__label' htmlFor={id}>
            {`Enter ${isNumber ? 'number' : 'text'}...`}
          </label>
          <span className='mdl-textfield__error'>Input is not a number!</span>
        </span>
      </ListItem>
    );
  }
}
