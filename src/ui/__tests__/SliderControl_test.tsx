import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as chai from "chai";

import { remixer } from "../../core/Remixer";
import { CSS } from "../../lib/Constants";
import { RangeVariable } from "../../core/variables/RangeVariable";
import { SliderControl } from "../controls/SliderControl";

const expect = chai.expect;

describe("SliderControl", () => {
  const key: string = "test_variable";
  const initialValue: number = 0.5;
  const minValue: number = 0;
  const maxValue: number = 1;
  const increment: number = 0.1;
  let variable: RangeVariable;

  beforeEach(() => {
    variable = remixer.addRangeVariable(key, initialValue, minValue, maxValue, increment);
    this.component = TestUtils.renderIntoDocument(
      <SliderControl
        variable={variable}
        updateVariable={null}
      />
    );
  });

  it("should render with proper class name", () => {
    let control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it("have correct min label", () => {
    let label = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER_MIN
    );

    expect(Number(label.textContent)).to.equal(minValue);
  });

  it("have correct max label", () => {
    let label = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_SLIDER_MAX
    );

    expect(Number(label.textContent)).to.equal(maxValue);
  });

  it("have correct slider input value and attributes", () => {
    let slider = TestUtils.findRenderedDOMComponentWithClass(
      this.component, "mdl-slider"
    ) as HTMLInputElement;

    expect(Number(slider.min)).to.equal(minValue);
    expect(Number(slider.max)).to.equal(maxValue);
    expect(Number(slider.step)).to.equal(increment);
    expect(Number(slider.value)).to.equal(initialValue);
  });
});
