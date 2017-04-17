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

import { remixer } from '../../core/Remixer';
import { ConstraintType, ControlType, DataType } from '../Constants';
import { LocalStorage } from '../LocalStorage';

const expect = chai.expect;
chai.use(sinonChai);

describe('LocalStorage', () => {

  function addVariables() {
    remixer.addBooleanVariable('test_key1', true);
    remixer.addStringVariable('test_key2', 'testString');
    remixer.addNumberVariable('test_key3', 40);
  }

  it('should call saveVariable method', () => {
    const callbackSpy = sinon.spy(LocalStorage, 'saveVariable');
    localStorage.clear();
    addVariables();

    expect(callbackSpy).to.have.been.calledThrice;
  });

  it('should retrieve correct variable from storage', () => {
    addVariables();
    const stringVariable = LocalStorage.getVariable('test_key2');

    expect(stringVariable.dataType).to.equal(DataType.STRING);
    expect(stringVariable.constraintType).to.equal(ConstraintType.NONE);
    expect(stringVariable.controlType).to.equal(ControlType.TEXT_INPUT);
    expect(stringVariable.selectedValue).to.equal('testString');
  });
});
