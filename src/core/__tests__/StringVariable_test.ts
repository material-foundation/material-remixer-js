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

import { ConstraintType, ControlType, DataType } from '../../lib/Constants';
import { remixer } from '../Remixer';
import { StringVariable } from '../variables/StringVariable';
import { Variable } from '../variables/Variable';

const expect = chai.expect;
chai.use(sinonChai);

describe('StringVariable', () => {
  const key: string = 'test variable';
  const sanitizedKey: string = 'test_variable';
  const initialValue: string = 'B';
  const limitedToValues: string[] = ['A', 'B', 'C', 'D'];
  let callbackSpy: sinon.SinonSpy;
  let variable: StringVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addStringVariable(
      key,
      initialValue,
      limitedToValues,
      callbackSpy,
    );
  });

  it('should create a new variable', () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(StringVariable);
  });

  it('have the correct datatype', () => {
    expect(variable.dataType).to.equal(DataType.STRING);
  });

  it('have the correct contraintType', () => {
    expect(variable.constraintType).to.equal(ConstraintType.LIST);

    variable.limitedToValues = [];
    expect(variable.constraintType).to.equal(ConstraintType.NONE);
  });

  it('should have correct controlType based on number of allowed values', () => {
    // List control.
    expect(variable.controlType).to.equal(ControlType.TEXT_LIST);

    // Segmented control.
    const var1 = remixer.addStringVariable('test_key1', 'a', ['a', 'b']);
    expect(var1.controlType).to.equal(ControlType.SEGMENTED);

    // Text input control.
    const var2 = remixer.addStringVariable('test_key2', 'a');
    expect(var2.controlType).to.equal(ControlType.TEXT_INPUT);
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
    const newValue = 'B';
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });

  it('should clone properly', () => {
    const clone = variable.clone();
    expect(JSON.stringify(clone)).to.equal(JSON.stringify(variable));
  });
});
