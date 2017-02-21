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

/** Keycode constants. */
export const KeyCode = {
  ESC: 27,
};

/** Key event constants. */
export const KeyEvent = {
  DOWN: "keydown",
};

/** Storage keys constants. */
export const StorageKey = {
  PREFERENCES: "__remixer_preferences__",
  REMIXER: "__remixer__",
  KEY_REMIXER: "remixer",
  KEY_REMOTE_ID: "remoteId",
  KEY_REMOTE_ENABLED: "remoteEnabled",
  KEY_VARIABLES: "variables"
};

/** Variable data constraints. */
export const ConstraintType = {
  NONE: "__ConstraintTypeNone__",
  LIST: "__ConstraintTypeList__",
  RANGE: "__ConstraintTypeRange__",
};

/** Rendered variable control types. */
export const ControlType = {
  BUTTON: "__ControlTypeButton__",
  COLOR_INPUT: "__ControlTypeColorInput__",
  COLOR_LIST: "__ControlTypeColorList__",
  SEGMENTED: "__ControlTypeSegmented__",
  SLIDER: "__ControlTypeSlider__",
  STEPPER: "__ControlTypeStepper__",
  SWITCH: "__ControlTypeSwitch__",
  TEXT_INPUT: "__ControlTypeTextInput__",
  TEXT_LIST: "__ControlTypeTextList__",
};

/** Variable data types. */
export const DataType = {
  BOOLEAN: "__DataTypeBoolean__",
  COLOR: "__DataTypeColor__",
  NUMBER: "__DataTypeNumber__",
  STRING: "__DataTypeString__",
};

/** CSS class and id constants. */
export const CSS = {
  MDL_LIST:               "mdl-list",
  MDL_LIST_ITEM:          "mdl-list__item",
  MDL_PRIMARY:            "mdl-list__item-primary-content",
  MDL_SECONDARY:          "mdl-list__item-secondary-content",
  MDL_TWO_LINE:           "mdl-list__item--two-line",

  RMX_COLOR_SWATCH:       "rmx-color-swatch",
  RMX_COLOR_SWATCH_ITEM:  "rmx-color-swatch-item",
  RMX_DROPDOWN:           "rmx-dropdown",
  RMX_OVERLAY_FRAME:      "__remixer-overlay-frame__",
  RMX_OVERLAY_WRAPPER:    "rmx-overlay-wrapper",
  RMX_RADIO_LIST:         "rmx-radio-list",
  RMX_RADIO_LIST_ITEM:    "rmx-radio-list-item",
  RMX_SELECTED_VALUE:     "rmx-selected-value",
  RMX_SHARE_MENU:         "rmx-share-menu",
  RMX_SLIDER:             "rmx-slider",
  RMX_SLIDER_MAX:         "rmx-slider-max-value",
  RMX_SLIDER_MIN:         "rmx-slider-min-value",
  RMX_SWITCH:             "rmx-switch",
  RMX_TEXTFIELD:          "rmx-textfield",
  RMX_VISIBLE:            "rmx-visible",
};
