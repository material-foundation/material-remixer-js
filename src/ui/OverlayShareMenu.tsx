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
import { ListItem } from './ListItem';

/**
 * Interface for the overlay share menu properties.
 * @interface
 */
export interface IOverlayShareMenuProps {
  visible: boolean;
  remoteId: string;
  remoteUrl: string;
  isEnabled: boolean;
  toggleRemoteEnabled(): void;
}

/**
 * Renders a collapsable remote share menu.
 *
 * @class
 * @extends React.Component
 */
export class OverlayShareMenu extends React.Component<IOverlayShareMenuProps, void> {

  /** @override */
  render() {
    const {
      visible,
      remoteId,
      remoteUrl,
      isEnabled,
    } = this.props;

    const showMenu = visible ? 'active' : '';
    const status = isEnabled ? 'on' : 'off';

    return (
      <div className={`${CSS.RMX_SHARE_MENU} ${showMenu}`}>
        <ListItem
          controlClass={CSS.RMX_SHARE_STATUS}
          title={`Sharing is ${status}`}
          subtitle='These values can be adjusted by anyone with the link.'
          inlineControl={true}
        >
          <label
            className='mdl-switch mdl-js-switch mdl-js-ripple-effect'
            htmlFor='share-switch'
          >
            <input
              id='share-switch'
              type='checkbox'
              className='mdl-switch__input'
              checked={isEnabled}
              onChange={this.props.toggleRemoteEnabled}
            />
          </label>
        </ListItem>
        <ListItem
          controlClass={`${CSS.RMX_SHARE_LINK} ${status}`}
          title='Link'
          inlineControl={false}
        >
          <div>
            <div><a href={remoteUrl} target='_blank'>{remoteUrl}</a></div>
            <div>
              <a href={remoteUrl} target='_blank'>
                <i className='material-icons'>share</i>
              </a>
            </div>
          </div>
        </ListItem>
      </div>
    );
  }
}
