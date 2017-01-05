import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { ConstraintType, DataType } from "../../lib/Constants";
import { StringVariable } from "../variables/StringVariable";
import { Variable } from "../variables/Variable";

const expect = chai.expect;
chai.use(sinonChai);

describe("StringVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: string = "B";
  const limitedToValues: string[] = ["A", "B", "C", "D"];
  let callbackSpy: sinon.SinonSpy;
  let variable: StringVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addStringVariable(
      key,
      defaultValue,
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
});
