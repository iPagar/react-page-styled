import IconZoomOut from '@mui/icons-material/ZoomOut';
import IconZoomIn from '@mui/icons-material/ZoomIn';
import React from 'react';
import {
  useCanZoomIn,
  useCanZoomOut,
  useIsSmallScreen,
  useZoomIn,
  useZoomOut,
} from '../../../core/components/hooks';
import Button from '../Button/index';
import { Button as DefaultButton } from '@nextui-org/react';

type Props = {
  labelZoomIn: string;
  labelZoomOut: string;
};

const Zoom: React.FC<Props> = ({ labelZoomIn, labelZoomOut }) => {
  const canZoomIn = useCanZoomIn();
  const canZoomOut = useCanZoomOut();

  const zoomOut = useZoomOut();
  const zoomIn = useZoomIn();

  const isSmall = useIsSmallScreen();

  return (
    <DefaultButton.Group
      css={{
        margin: 0,
      }}
    >
      <Button
        placement="left"
        disabled={!canZoomIn}
        icon={<IconZoomIn />}
        description={labelZoomIn}
        onClick={zoomIn}
        activeColor="default"
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Button
        placement="left"
        disabled={!canZoomOut}
        icon={<IconZoomOut />}
        description={labelZoomOut}
        onClick={zoomOut}
        activeColor="default"
        tooltipStyle={{
          right: '16px',
          left: 'auto',
        }}
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      />
    </DefaultButton.Group>
  );
};

export default React.memo(Zoom);
