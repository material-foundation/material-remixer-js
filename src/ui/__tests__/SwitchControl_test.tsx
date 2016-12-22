import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as chai from "chai";

import { remixer } from "../../core/Remixer";
import { CSS } from "../../lib/Constants";
import { SwitchControl } from "../controls/SwitchControl";
import { Variable } from "../../core/variables/Variable";

const expect = chai.expect;

describe("SwitchControl", () => {
  const key: string = "test_variable";
  const defaultValue: boolean = true;
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addBooleanVariable(key, defaultValue,);
    this.component = TestUtils.renderIntoDocument(
      <SwitchControl
        variable={variable}
        updateVariable={null}
      />
    );
  });

  it("should render with proper class name", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SWITCH
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it("have correct switch checked value", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, "mdl-switch__input"
    ) as HTMLInputElement;

    expect(control.checked).to.equal(defaultValue);
  });
});
