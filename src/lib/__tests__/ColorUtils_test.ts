/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import * as chai from 'chai';

import { ColorUtils } from '../ColorUtils';

const expect = chai.expect;

describe('ColorUtils', () => {

  const redRgbString: string = 'rgb(255, 0, 0)';
  const alphaRgbaString: string = 'rgba(120, 13, 99, 0.6)';

  it('should create proper rgba string from color strings', () => {
    expect(ColorUtils.toRgbaString('red')).to.equal(redRgbString);
    expect(ColorUtils.toRgbaString('FF0000')).to.equal(redRgbString);
    expect(ColorUtils.toRgbaString(alphaRgbaString)).to.equal(alphaRgbaString);
  });

  it('should create proper rgba string from RgbaColor object', () => {
    const redRgbaColor = ColorUtils.toRgba('red');
    expect(ColorUtils.toRgbaString(redRgbaColor)).to.equal(redRgbString);

    const alpgaRgbaColor = ColorUtils.toRgba(alphaRgbaString);
    expect(ColorUtils.toRgbaString(alpgaRgbaColor)).to.equal(alphaRgbaString);

    const blueRgbaColor = ColorUtils.toRgba('blue');
    expect(ColorUtils.toRgbaString(blueRgbaColor)).to.not.equal(redRgbString);
  });

  it('should properly compare color equality', () => {
    expect(ColorUtils.areEqual(redRgbString, 'red')).to.be.true;
    expect(ColorUtils.areEqual(redRgbString, 'blue')).to.not.be.true;
  });

  it('should properly choose most readable color', () => {
    const readableColor = ColorUtils.mostReadable('black', ['white', 'black']);
    expect(readableColor).to.equal(ColorUtils.toRgbaString('white'));
  });
});
