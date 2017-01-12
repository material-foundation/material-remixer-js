import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { BooleanVariable } from "../variables/BooleanVariable";
import { ConstraintType, ControlType, DataType } from "../../lib/Constants";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("BooleanVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const selectedValue: boolean = true;
  let callbackSpy: sinon.SinonSpy;
  let variable: BooleanVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addBooleanVariable(key, selectedValue, callbackSpy);
  });

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(BooleanVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(DataType.BOOLEAN);
  });

  it("have the correct contraintType", () => {
    expect(variable.constraintType).to.equal(ConstraintType.NONE);
  });

  it("have the correct controlType", () => {
    expect(variable.controlType).to.equal(ControlType.SWITCH);
  });

  it("have the correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("have the correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = !variable.selectedValue;
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });

  it("should clone properly", () => {
    let clone = variable.clone();
    expect(JSON.stringify(clone)).to.equal(JSON.stringify(variable));
  });
});
