import React from 'react';
import type { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const Controls = (props: Pick<SlateProps, 'translations' | 'plugins'>) => {
  const { plugins, translations } = props;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {plugins &&
        plugins.map((plugin, i: number) =>
          plugin.addToolbarButton ? (
            <PluginButton key={i} translations={translations} plugin={plugin} />
          ) : null
        )}
    </div>
  );
};

export default React.memo(Controls);
