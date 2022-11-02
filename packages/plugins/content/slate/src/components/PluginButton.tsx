import { useUiTranslator } from '@react-page-styled/editor';
import type { MouseEventHandler } from 'react';
import React, { useCallback, useState } from 'react';
import { Range } from 'slate';
import useAddPlugin from '../hooks/useAddPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import usePluginIsDisabled from '../hooks/usePluginIsDisabled';
import useRemovePlugin from '../hooks/useRemovePlugin';
import { useSlate } from 'slate-react';
import type {
  PluginButtonProps,
  SlatePluginDefinition,
} from '../types/slatePluginDefinitions';
import PluginControls from './PluginControls';
import ToolbarButton from './ToolbarButton';

type Props = {
  plugin: SlatePluginDefinition<unknown>;
} & PluginButtonProps;

function PluginButton(props: Props) {
  const { plugin } = props;
  const { t } = useUiTranslator();
  const hasControls = Boolean(plugin.controls);

  const [showControls, setShowControls] = useState(false);

  const editor = useSlate();

  const isActive = usePluginIsActive(plugin);
  const shouldInsertWithText =
    plugin.pluginType === 'component' &&
    (plugin.object === 'inline' || plugin.object === 'mark') &&
    (!editor.selection || Range.isCollapsed(editor.selection)) &&
    !isActive;

  const add = useAddPlugin(plugin);
  const remove = useRemovePlugin(plugin);
  const close = useCallback(() => setShowControls(false), [setShowControls]);
  const onClick: MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (e) => {
      if (hasControls || shouldInsertWithText) {
        setShowControls(!showControls);
      } else {
        if (isActive) {
          remove();
        } else {
          add();
        }
      }
    },
    [isActive, hasControls, showControls, shouldInsertWithText]
  );

  const isDisabled = usePluginIsDisabled(plugin);

  return (
    <>
      <ToolbarButton
        onClick={onClick}
        disabled={isDisabled}
        isActive={isActive}
        icon={
          plugin.icon ||
          (plugin.pluginType === 'component' && plugin.deserialize?.tagName)
        }
        toolTip={t(plugin.label)}
      />

      {(hasControls || shouldInsertWithText) && showControls ? (
        <PluginControls {...props} open={showControls} close={close} />
      ) : null}
    </>
  );
}

export default React.memo(PluginButton);
