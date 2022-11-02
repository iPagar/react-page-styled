import Icon from '@material-ui/icons/FileCopy';
import { Button, Tooltip } from '@nextui-org/react';
import React from 'react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';

export const DuplicateButton: React.FC<{ nodeId: string }> = React.memo(
  ({ nodeId }) => {
    const duplicateCell = useDuplicateCell(nodeId);
    const { t } = useUiTranslator();
    return (
      <Tooltip content={t('Duplicate Plugin') ?? ''}>
        <Button
          flat
          auto
          onClick={duplicateCell}
          aria-label="delete"
          color="default"
          icon={<Icon />}
        />
      </Tooltip>
    );
  }
);
