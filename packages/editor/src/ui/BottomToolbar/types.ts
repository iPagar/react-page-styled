import type { Theme } from '@mui/material';
import type { ReactNode } from 'react';
export type BottomToolbarProps = {
  open?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  theme?: Theme;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  pluginControls?: ReactNode;
  actionsLeft?: ReactNode;
} & BottomToolbarToolsProps;

export type BottomToolbarToolsProps = {
  nodeId: string;
};
