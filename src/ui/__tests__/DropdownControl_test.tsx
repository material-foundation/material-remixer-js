import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as chai from "chai";

import { remixer } from "../../core/Remixer";
import { CSS } from "../../lib/Constants";
import { DropdownControl } from "../controls/DropdownControl";
import { Variable } from "../../core/variables/Variable";

const expect = chai.expect;

describe("DropdownControl", () => {
  const key: string = "test_variable";
  const selectedValue: string = "a";
  const limitedToValues: string[] = ["a", "b", "c"];
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addStringVariable(key, selectedValue, limitedToValues);
    this.component = TestUtils.renderIntoDocument(
      <DropdownControl
        variable={variable}
        updateVariable={null}
      />
    );
  });

  it("should render with proper class name", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_DROPDOWN
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it("have correct number of children with proper data values", () => {
    let list = TestUtils.findRenderedDOMComponentWithTag(
      this.component, "ul"
    );

    expect(list.children.length).to.equal(3);

    for (let i = 0; i < list.children.length; i++) {
      let element = list.children[i] as HTMLElement;
      expect(element.dataset["value"]).to.equal(limitedToValues[i]);
    }
  });
});
