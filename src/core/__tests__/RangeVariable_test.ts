import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { ConstraintType, DataType } from "../../lib/Constants";
import { RangeVariable } from "../variables/RangeVariable";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("RangeVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: number = 1;
  const minValue: number = 0;
  const maxValue: number = 1;
  const increment: number = 0.1;
  let callbackSpy: sinon.SinonSpy;
  let variable: RangeVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addRangeVariable(
      key,
      defaultValue,
      minValue,
      maxValue,
      increment,
      callbackSpy,
    );
  });

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(RangeVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(DataType.NUMBER);
  });

  it("have the correct contraintType", () => {
    expect(variable.constraintType).to.equal(ConstraintType.RANGE);
  });

  it("have the correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("have the correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("have the correct min, max, and increment properties", () => {
    expect(variable.minValue).to.equal(minValue);
    expect(variable.maxValue).to.equal(maxValue);
    expect(variable.increment).to.equal(increment);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = 0.4;
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
