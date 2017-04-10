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

import { BooleanVariable } from '../../core/variables/BooleanVariable';
import { ColorVariable } from '../../core/variables/ColorVariable';
import { NumberVariable } from '../../core/variables/NumberVariable';
import { RangeVariable } from '../../core/variables/RangeVariable';
import { StringVariable } from '../../core/variables/StringVariable';
import { Variable } from '../../core/variables/Variable';

/**
 * Interface for variable controls properties and state.
 * @interface
 */
export interface IControlUpdateProps {
  updateVariable(variable: Variable, selectedValue: any): void;
}

/**
 * Interface for variable control properties.
 * @interface
 */
interface IControlVariableProps extends IControlUpdateProps {
  variable: Variable;
}

/**
 * Interface for the properties of a control that implements a Boolean variable.
 * @interface
 * @extends ControlInterface
 */
export interface IBooleanControlProps extends IControlVariableProps {
  variable: BooleanVariable;
}

/**
 * Interface for the properties of a control that implements a Color variable.
 * @interface
 * @extends ControlInterface
 */
export interface IColorControlProps extends IControlVariableProps {
  variable: ColorVariable;
}

/**
 * Interface for the properties of a control that implements a Number variable.
 * @interface
 * @extends ControlInterface
 */
export interface INumberControlProps extends IControlVariableProps {
  variable: NumberVariable;
}

/**
 * Interface for the properties of a control that implements a Range variable.
 * @interface
 * @extends ControlInterface
 */
export interface IRangeControlProps extends IControlVariableProps {
  variable: RangeVariable;
}

/**
 * Interface for the properties of a control that implements a String variable.
 * @interface
 * @extends ControlInterface
 */
export interface IStringControlProps extends IControlVariableProps {
  variable: StringVariable;
}
