import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as chai from "chai";

import { remixer } from "../../core/Remixer";
import { CSS } from "../../lib/Constants";
import { TextFieldControl } from "../controls/TextFieldControl";
import { Variable } from "../../core/variables/Variable";

const expect = chai.expect;

describe("TextFieldControl", () => {
  const key: string = "test_variable";
  const selectedValue: string = "test string value";
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addStringVariable(key, selectedValue);
    this.component = TestUtils.renderIntoDocument(
      <TextFieldControl
        variable={variable}
        updateVariable={null}
      />
    );
  });

  it("should render with proper class name", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_TEXTFIELD
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it("have correct innertext checked value", () => {
    let textField = TestUtils.findRenderedDOMComponentWithClass(
      this.component, "mdl-textfield__input"
    ) as HTMLInputElement;

    expect(textField.value).to.equal(selectedValue);
  });
});
