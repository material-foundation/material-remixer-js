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
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { ColorUtils } from '../../lib/ColorUtils';
import { ConstraintType, ControlType, DataType } from '../../lib/Constants';
import { remixer } from '../Remixer';
import { ColorVariable } from '../variables/ColorVariable';
import { Variable } from '../variables/Variable';

const expect = chai.expect;
chai.use(sinonChai);

describe('ColorVariable', () => {
  const key: string = 'test variable';
  const sanitizedKey: string = 'test_variable';
  const initialValue: string = '#4285F4';
  const limitedToValues: string[] = ['#4285F4', '#0F9D58', '#DB4437'];
  let callbackSpy: sinon.SinonSpy;
  let variable: ColorVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addColorVariable(
      key,
      initialValue,
      limitedToValues,
      callbackSpy,
    );
  });

  it('should create a new variable', () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(ColorVariable);
  });

  it('have the correct datatype', () => {
    expect(variable.dataType).to.equal(DataType.COLOR);
  });

  it('have the correct contraintType', () => {
    expect(variable.constraintType).to.equal(ConstraintType.LIST);

    variable.limitedToValues = [];
    expect(variable.constraintType).to.equal(ConstraintType.NONE);
  });

  it('have the correct controlType', () => {
    expect(variable.controlType).to.equal(ControlType.COLOR_LIST);
  });

  it('should have correct controlType based on number of allowed values', () => {
    // List control.
    expect(variable.controlType).to.equal(ControlType.COLOR_LIST);

    // Input control.
    const var1 = remixer.addColorVariable('test_key', '#4285F4');
    expect(var1.controlType).to.equal(ControlType.COLOR_INPUT);
  });

  it('have the correct title', () => {
    expect(variable.title).to.equal(key);
  });

  it('have the correct sanitized key', () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it('have the correct allowed values', () => {
    expect(variable.limitedToValues).to.equal(limitedToValues);
  });

  it('should trigger callback when selected value of variable changes', () => {
    const newValue = '#0F9D58';
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue.toLowerCase()).to.equal(newValue.toLowerCase());
  });

  it('should clone properly', () => {
    const clone = variable.clone();
    expect(JSON.stringify(clone)).to.equal(JSON.stringify(variable));
  });

  it('should return string color value after format', () => {
    const color = 'rgba(1, 1, 1, 0.8)';
    const rgbaColor = ColorUtils.toRgba(color);
    const formattedColor = variable.formatValue(rgbaColor);

    expect(color).to.equal(formattedColor);
    expect(color).to.not.equal(rgbaColor);
  });
});
