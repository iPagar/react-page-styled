import ScaleIcon from '@material-ui/icons/AspectRatio';
import { Button, Tooltip } from '@nextui-org/react';
import React from 'react';
import { useUiTranslator } from '../../core/components/hooks';
const SCALING_FACTORS = [1, 0.8, 0.6, 1.2];
let lastScale = SCALING_FACTORS[0]; // poor mans redux

export const ScaleButton: React.FC<{
  scale: number;
  setScale: (s: number) => void;
}> = ({ scale, setScale }) => {
  const { t } = useUiTranslator();
  const toggleScale = React.useCallback(() => {
    const newScalingFactor =
      SCALING_FACTORS[
        (SCALING_FACTORS.indexOf(lastScale ?? scale) + 1) %
          SCALING_FACTORS.length
      ];
    setScale(newScalingFactor);
    // poor man's redux
    lastScale = newScalingFactor;
  }, [scale, lastScale, setScale]);
  return (
    <Tooltip content={t('Change size of this window') ?? ''}>
      <Button
        flat
        auto
        onClick={toggleScale}
        aria-label="Change size of this window"
        color="primary"
        icon={<ScaleIcon />}
      ></Button>
    </Tooltip>
  );
};
