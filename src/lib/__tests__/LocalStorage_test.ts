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
