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

import * as React from 'react';

import { CSS } from '../lib/Constants';

/**
 * Interface for the properties assigned to the ListItem component.
 * @interface
 */
interface IListItemProps {
  title: string;
  subtitle?: string;
  inlineControl: boolean;
  controlClass?: string;
  children?: any;
}

/** Returns a stateless page layout template. */
export function ListItem(props: IListItemProps) {
  const inline = props.inlineControl ? 'inline' : '';
  return (
    <div className={`${CSS.RMX_LIST_ITEM} ${props.controlClass} ${inline}`}>
      <div className='meta'>
        <div className='title'>{props.title}</div>
        <div className='subtitle'>{props.subtitle}</div>
      </div>
      <div className='control'>{props.children}</div>
    </div>
  );
}
