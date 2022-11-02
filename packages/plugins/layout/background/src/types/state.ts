import type { RGBColor } from '@react-page-styled/editor';
import type { Gradient } from './gradient';
import type { ModeEnum } from './ModeEnum';

export type BackgroundState = {
  background: string;
  backgroundColor: RGBColor;
  isParallax: boolean;
  isBorderRadius: boolean;
  borderRadiusColor: RGBColor;
  backgroundSize: number;
  modeFlag: ModeEnum;
  padding: number;
  lighten: number;
  darken: number;
  hasPadding: boolean;
  gradients: Gradient[];
  zIndex: number;
  marginTop: string;
};
