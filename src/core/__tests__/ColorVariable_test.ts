import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { remixer } from "../Remixer";
import { ColorVariable } from "../variables/ColorVariable";
import { Variable } from "../variables/Variable";
import { VariableType } from "../../lib/Constants";

const expect = chai.expect;
chai.use(sinonChai);

describe("ColorVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: string = "#4285F4";
  const possibleValues: Array<string> = ["#4285F4", "#0F9D58", "#DB4437"];
  let callbackSpy: sinon.SinonSpy;
  let variable: ColorVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addColorVariable(key, defaultValue, possibleValues, callbackSpy);
  });

  it("should create new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(ColorVariable);
  });

  it("should create a variable with correct datatype", () => {
    expect(variable.dataType).to.equal(VariableType.COLOR);
  });

  it("should create a variable with correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("should create a variable with correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("should create a variable with correct possible values", () => {
    expect(variable.possibleValues).to.equal(possibleValues);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = "#0F9D58";
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });
});
