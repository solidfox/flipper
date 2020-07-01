/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React, {memo, useEffect, createElement} from 'react';
import {SandyPluginContext} from './PluginContext';
import {SandyPluginInstance} from './Plugin';

type Props = {
  plugin: SandyPluginInstance;
};

/**
 * Component to render a Sandy plugin container
 */
export const SandyPluginRenderer = memo(
  ({plugin}: Props) => {
    useEffect(() => {
      plugin.deactivate();
    }, [plugin]);

    return (
      <SandyPluginContext.Provider value={plugin}>
        {createElement(plugin.definition.module.Component)}
      </SandyPluginContext.Provider>
    );
  },
  () => {
    // One of the goals of the ModernPluginContainer is that we want to prevent it from rendering
    // for any outside change. Whatever happens outside of us, we don't care. If it is relevant for use, we take care about it from the insde
    return true;
  },
);