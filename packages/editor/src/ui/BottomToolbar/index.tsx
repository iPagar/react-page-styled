import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: React.FC<BottomToolbarProps> = React.memo(
  ({
    open = false,
    className,
    theme,
    anchor = 'bottom',
    pluginControls,
    nodeId,
    actionsLeft,
    style,
    children,
  }) => {
    const [scale, setScale] = React.useState(1);
    return (
      <ThemeProvider theme={theme ? theme : null}>
        <BottomToolbarDrawer
          className={className}
          open={open}
          anchor={anchor}
          scale={scale}
          style={style}
          bottom={
            <BottomToolbarMainBar
              nodeId={nodeId}
              actionsLeft={[
                <ScaleButton
                  key="scalebutton"
                  scale={scale}
                  setScale={setScale}
                />,
                ...React.Children.toArray(actionsLeft),
              ]}
            />
          }
        >
          {children}
          {pluginControls}
        </BottomToolbarDrawer>
      </ThemeProvider>
    );
  }
);
