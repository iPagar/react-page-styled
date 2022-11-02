import IconRedo from '@mui/icons-material/Redo';
import IconUndo from '@mui/icons-material/Undo';
import React from 'react';
import {
  useCanRedo,
  useCanUndo,
  useIsSmallScreen,
  useRedo,
  useUndo,
} from '../../../core/components/hooks';
import Button from '../Button/index';
import { Button as DefaultButton } from '@nextui-org/react';

type Props = {
  labelUndo: string;
  labelRedo: string;
};
const UndoRedo: React.FC<Props> = ({ labelUndo, labelRedo }) => {
  const undo = useUndo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const redo = useRedo();
  const isSmall = useIsSmallScreen();
  return (
    <DefaultButton.Group>
      <Button
        placement="top"
        active
        disabled={!canUndo}
        icon={<IconUndo />}
        description={labelUndo}
        onClick={undo}
        activeColor="primary"
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Button
        placement="top"
        active
        disabled={!canRedo}
        icon={<IconRedo />}
        description={labelRedo}
        onClick={redo}
        activeColor="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      />
    </DefaultButton.Group>
  );
};

export default React.memo(UndoRedo);
