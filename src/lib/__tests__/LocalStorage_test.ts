import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../../core/Remixer";
import { DataType } from "../Constants";
import { LocalStorage } from "../LocalStorage";

const expect = chai.expect;
chai.use(sinonChai);

describe("LocalStorage", () => {

  function addVariables() {
    remixer.addBooleanVariable("key1", true);
    remixer.addStringVariable("key2", "testString");
    remixer.addNumberVariable("key3", 40);
  }

  it("should call saveVariable method", () => {
    let callbackSpy = sinon.spy(LocalStorage, "saveVariable");
    localStorage.clear();
    addVariables();

    expect(callbackSpy).to.have.been.calledThrice;
  });

  it("should retrieve correct variable from storage", () => {
    addVariables();
    let stringVariable = LocalStorage.getVariable("key2");

    expect(stringVariable.dataType).to.equal(DataType.STRING);
    expect(stringVariable.selectedValue).to.equal("testString");
  });
});
