import { Avatar } from '@mui/material';
import { Card, Grid, User } from '@nextui-org/react';
import React from 'react';
import {
  useFocusCell,
  useOption,
  usePluginOfCell,
  useUiTranslator,
} from '../../core/components/hooks';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';

export type BottomToolbarMainBarProps = {
  nodeId: string;
  actionsLeft?: React.ReactNode;
};
export const BottomToolbarMainBar: React.FC<BottomToolbarMainBarProps> =
  React.memo(({ nodeId, actionsLeft }) => {
    const { title, icon } = usePluginOfCell(nodeId) ?? {};
    const { t } = useUiTranslator();
    const focus = useFocusCell(nodeId);
    const showMoveButtons = useOption('showMoveButtonsInBottomToolbar');
    return (
      <Grid.Container direction="row" alignItems="center" gap={1}>
        {icon || title ? (
          <Grid>
            <Avatar
              onClick={() => focus(true)}
              children={icon || (title ? title[0] : '')}
              style={{
                cursor: 'pointer',
              }}
            />
          </Grid>
        ) : null}
        {
          <Grid
            css={{
              marginRight: 8,
            }}
          >
            {title}
          </Grid>
        }

        {actionsLeft &&
          React.Children.map(actionsLeft, (action, index) => (
            <Grid key={index}>{action}</Grid>
          ))}
        {showMoveButtons ? (
          <Grid style={{ marginLeft: 'auto' }}>
            <MoveActions nodeId={nodeId} />
          </Grid>
        ) : null}

        <Grid style={{ marginLeft: 'auto' }}>
          <BottomToolbarTools nodeId={nodeId} />
        </Grid>
      </Grid.Container>
    );
  });
