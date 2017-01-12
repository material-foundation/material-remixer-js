import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as chai from "chai";

import { remixer } from "../../core/Remixer";
import { ColorSwatchControl } from "../controls/ColorSwatchControl";
import { CSS } from "../../lib/Constants";
import { Variable } from "../../core/variables/Variable";

const expect = chai.expect;

describe("ColorSwatchControl", () => {
  const key: string = "test_variable";
  const initialValue: string = "#4285F4";
  const limitedToValues: string[] = ["#4285F4", "#0F9D58", "#DB4437"];
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addColorVariable(key, initialValue, limitedToValues);
    this.component = TestUtils.renderIntoDocument(
      <ColorSwatchControl
        variable={variable}
        updateVariable={null}
      />
    );
  });

  it("should render with proper class name", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_COLOR_SWATCH
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it("have correct number of children with proper data values", () => {
    let list = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.MDL_SECONDARY
    );

    expect(list.children.length).to.equal(3);

    for (let i = 0; i < list.children.length; i++) {
      let element = list.children[i] as HTMLElement;
      expect(element.dataset["value"]).to.equal(limitedToValues[i]);
    }
  });
});
