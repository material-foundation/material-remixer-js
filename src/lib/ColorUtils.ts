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

import * as TinyColor from 'tinycolor2';

/**
 * A representation of RGBA color.
 * @interface
 */
export interface RgbaColor {
  // All values [0-255].
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * A class that provides utilities to interact with TinyColor library.
 * @class
 */
export class ColorUtils {

  /**
   * Converts a color string or RgbaColor to an RGBA string.
   * @param  {any}    color The color string or RgbaColor to convert.
   * @return {string}       Returns the RGBA string.
   */
  static toRgbaString(color: any): string {
    if (typeof color !== 'string') {
      // Convert alpha back from int[0-255] to [0-1] float.
      (color as RgbaColor).a /= 255;
    }
    return TinyColor(color).toRgbString();
  }

  /**
   * Converts a color string to its RgbaColor equivalent. Any alpha values
   * will be normalized to int[0-255].
   * @param  {string}    color The color string to convert.
   * @return {RgbaColor}       Returns the RgbaColor.
   */
  static toRgba(color: string): RgbaColor {
    const rgba = TinyColor(color).toRgb();
    // Convert alpha from float to int[0-255].
    rgba.a = Math.round(rgba.a * 255);
    return rgba;
  }

  /**
   * Returns whether to color strings are equal.
   * @param  {string}  color1 The first color to test if equal.
   * @param  {string}  color2 The second color to test if equal.
   * @return {boolean}        Returns true if equal. Otherwise false.
   */
  static areEqual(color1: string, color2: string): boolean {
    return TinyColor(color1).toRgbString() === TinyColor(color2).toRgbString();
  }

  /**
   * Determine a readable color from a base color and list of possible colors.
   * @param  {any}    baseColor The base color of which to test for readable color.
   * @param  {any[]}  colorList A list of possible colors.
   * @return {string}           Returns the most readable color.
   */
  static mostReadable(baseColor: any, colorList: any[]): string {
    colorList.map((color) => {
      return TinyColor(color);
    });
    return TinyColor.mostReadable(TinyColor(baseColor), colorList).toRgbString();
  }
}
