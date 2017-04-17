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
import { RangeVariable } from '../../core/variables/RangeVariable';
import { CSS } from '../../lib/Constants';
import { SliderControl } from '../controls/SliderControl';

const expect = chai.expect;

describe('SliderControl', () => {
  const key: string = 'test_variable';
  const initialValue: number = 0.5;
  const minValue: number = 0;
  const maxValue: number = 1;
  const increment: number = 0.1;
  let variable: RangeVariable;

  beforeEach(() => {
    variable = remixer.addRangeVariable(key, initialValue, minValue, maxValue, increment);
    this.component = TestUtils.renderIntoDocument(
      <SliderControl
        variable={variable}
        updateVariable={null}
      />,
    );
  });

  it('should render with proper class name', () => {
    const control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER,
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it('have correct min label', () => {
    const label = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER_MIN,
    );

    expect(Number(label.textContent)).to.equal(minValue);
  });

  it('have correct max label', () => {
    const label = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER_MAX,
    );

    expect(Number(label.textContent)).to.equal(maxValue);
  });

  it('have correct slider input value and attributes', () => {
    const slider = TestUtils.findRenderedDOMComponentWithClass(
      this.component, 'mdl-slider',
    ) as HTMLInputElement;

    expect(Number(slider.min)).to.equal(minValue);
    expect(Number(slider.max)).to.equal(maxValue);
    expect(Number(slider.step)).to.equal(increment);
    expect(Number(slider.value)).to.equal(initialValue);
  });
});
