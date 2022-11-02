import type { RGBColor } from '@react-page-styled/editor';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color?: RGBColor }[];
};
