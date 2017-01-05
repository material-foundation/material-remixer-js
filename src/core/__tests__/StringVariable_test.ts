import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { ConstraintType, ControlType, DataType } from "../../lib/Constants";
import { StringVariable } from "../variables/StringVariable";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("StringVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: string = "B";
  const possibleValues: string[] = ["A", "B", "C", "D"];
  let callbackSpy: sinon.SinonSpy;
  let variable: StringVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addStringVariable(
      key,
      defaultValue,
      possibleValues,
      callbackSpy,
    );
  });

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(StringVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(DataType.STRING);
  });

  it("have the correct contraintType", () => {
    expect(variable.constraintType).to.equal(ConstraintType.LIST);
  });

  it("have the correct controlType", () => {
    expect(variable.controlType).to.equal(ControlType.TEXT_LIST);

    variable.possibleValues.splice(0, 2);
    expect(variable.controlType).to.equal(ControlType.SEGMENTED);

    variable.possibleValues = [];
    expect(variable.controlType).to.equal(ControlType.TEXT_INPUT);
  });

  it("have the correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("have the correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("have the correct possible values", () => {
    expect(variable.possibleValues).to.equal(possibleValues);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = "B";
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });
});
