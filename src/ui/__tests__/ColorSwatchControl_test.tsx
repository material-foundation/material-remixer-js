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

import * as chai from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import { remixer } from '../../core/Remixer';
import { Variable } from '../../core/variables/Variable';
import { ColorUtils } from '../../lib/ColorUtils';
import { CSS } from '../../lib/Constants';
import { ColorSwatchControl } from '../controls/ColorSwatchControl';

const expect = chai.expect;

describe('ColorSwatchControl', () => {
  const key: string = 'test_variable';
  const initialValue: string = '#4285F4';
  const limitedToValues: string[] = ['#4285F4', '#0F9D58', '#DB4437'];
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addColorVariable(key, initialValue, limitedToValues);
    this.component = TestUtils.renderIntoDocument(
      <ColorSwatchControl
        variable={variable}
        updateVariable={null}
      />,
    );
  });

  it('should render with proper class name', () => {
    const control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_COLOR_SWATCH,
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it('have correct number of children with proper data values', () => {
    const list = TestUtils.findRenderedDOMComponentWithClass(
      this.component, 'control',
    );

    expect(list.children.length).to.equal(3);

    for (let i = 0; i < list.children.length; i++) {
      const element = list.children[i] as HTMLElement;
      expect(element.dataset.value).to.equal(ColorUtils.toRgbaString(limitedToValues[i]));
    }
  });
});
