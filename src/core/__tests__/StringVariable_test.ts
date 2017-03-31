import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConstraintType, ControlType, DataType } from "../../lib/Constants";
import { remixer } from "../Remixer";
import { StringVariable } from "../variables/StringVariable";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("StringVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const initialValue: string = "B";
  const limitedToValues: string[] = ["A", "B", "C", "D"];
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

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(StringVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(DataType.STRING);
  });

  it("have the correct contraintType", () => {
    expect(variable.constraintType).to.equal(ConstraintType.LIST);

    variable.limitedToValues = [];
    expect(variable.constraintType).to.equal(ConstraintType.NONE);
  });

  it("should have correct controlType based on number of allowed values", () => {
    // List control.
    expect(variable.controlType).to.equal(ControlType.TEXT_LIST);

    // Segmented control.
    let var1 = remixer.addStringVariable("test_key1", "a", ["a", "b"]);
    expect(var1.controlType).to.equal(ControlType.SEGMENTED);

    // Text input control.
    let var2 = remixer.addStringVariable("test_key2", "a");
    expect(var2.controlType).to.equal(ControlType.TEXT_INPUT);
  });

  it("have the correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("have the correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("have the correct allowed values", () => {
    expect(variable.limitedToValues).to.equal(limitedToValues);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = "B";
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
