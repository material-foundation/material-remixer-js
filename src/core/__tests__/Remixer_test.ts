import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { DataType } from "../../lib/Constants";

const expect = chai.expect;
chai.use(sinonChai);

describe("Remixer", () => {

  beforeEach(() => {
    localStorage.clear();
    remixer.addBooleanVariable("key1", true);
    remixer.addStringVariable("key2", "testString");
    remixer.addNumberVariable("key3", 40);
  });

  it("should create an iframe after start", () => {
    expect(remixer.frameElement).to.not.exist;
    remixer.start();
    expect(remixer.frameElement).to.exist;
  });

  it("have the correct number of variables in array", () => {
    let variablesArray = remixer.attachedInstance.variablesArray;
    expect(variablesArray).to.have.length(3);
  });

  it("should retrieve variables from map", () => {
    let variablesMap = remixer.attachedInstance.variables;
    expect(variablesMap).to.have.all.keys("key1", "key2", "key3");
  });

  it("should retrieve correct variable from map by key", () => {
    let stringVariable = remixer.getVariable("key2");
    expect(stringVariable.dataType).to.equal(DataType.STRING);
  });

  it("should update selected value of variable", () => {
    let numberVariable = remixer.getVariable("key3");
    expect(numberVariable.selectedValue).to.equal(40);

    remixer.updateVariable(numberVariable, 50);
    expect(numberVariable.selectedValue).to.equal(50);
  });
});
