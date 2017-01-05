import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { ColorVariable } from "../variables/ColorVariable";
import { ConstraintType, DataType } from "../../lib/Constants";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("ColorVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: string = "#4285F4";
  const limitedToValues: string[] = ["#4285F4", "#0F9D58", "#DB4437"];
  let callbackSpy: sinon.SinonSpy;
  let variable: ColorVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addColorVariable(
      key,
      defaultValue,
      limitedToValues,
      callbackSpy,
    );
  });

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(ColorVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(DataType.COLOR);
  });

  it("have the correct contraintType", () => {
    expect(variable.constraintType).to.equal(ConstraintType.LIST);
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
    const newValue = "#0F9D58";
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });
});
