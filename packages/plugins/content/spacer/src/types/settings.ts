import type { CellPluginComponentProps } from '@react-page-styled/editor';
import type { SpacerState } from './state';
import type { Translations } from './translations';

export interface SpacerSettings {
  Renderer: React.ComponentType<CellPluginComponentProps<SpacerState>>;

  translations?: Translations;
}
