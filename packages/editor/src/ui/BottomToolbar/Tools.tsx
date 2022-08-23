import Delete from '@material-ui/icons/Delete';
import { Button, Grid, Tooltip } from '@nextui-org/react';
import React from 'react';
import { useRemoveCell, useUiTranslator } from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
import type { BottomToolbarToolsProps } from './types';

export type { BottomToolbarToolsProps };
export const BottomToolbarTools: React.FC<BottomToolbarToolsProps> = React.memo(
  ({ nodeId }) => {
    const { t } = useUiTranslator();
    const removeCell = useRemoveCell(nodeId);

    return (
      <Grid.Container style={{ display: 'flex', alignItems: 'center' }} gap={1}>
        <Grid>
          <I18nTools nodeId={nodeId} />
        </Grid>
        <Grid>
          <DraftSwitch nodeId={nodeId} />
        </Grid>
        <Grid>
          <SelectParentButton nodeId={nodeId} />
        </Grid>
        <Grid>
          <DuplicateButton nodeId={nodeId} />
        </Grid>

        <Tooltip content={t('Remove Plugin') ?? ''}>
          <Button
            flat
            auto
            onClick={() => removeCell()}
            aria-label="delete"
            color="error"
            icon={<Delete />}
          />
        </Tooltip>
      </Grid.Container>
    );
  }
);
