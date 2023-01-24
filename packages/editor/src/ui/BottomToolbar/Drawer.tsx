import type { DrawerProps } from '@material-ui/core';
import { Divider, Drawer, Portal } from '@material-ui/core';
import { Box } from '@mui/material';
import { Card } from '@nextui-org/react';
import type { PropsWithChildren } from 'react';
import React, { Fragment } from 'react';
import { CloseSquare } from 'react-iconly';
import {
  useBlurAllCells,
  useIsEditMode,
  useIsSmallScreen,
  useOption,
} from '../../core/components/hooks';

const darkBlack = 'rgba(0, 0, 0, 0.87)';
const bright = 'rgba(255,255,255, 0.98)';
const brightBorder = 'rgba(0, 0, 0, 0.12)';

export type BottomToolbarDrawerProps = {
  open: boolean;
  style?: React.CSSProperties;
  className?: string;
  anchor?: DrawerProps['anchor'];
  dark?: boolean;
  scale?: number;
  bottom: React.ReactNode;
};

export const BottomToolbarDrawer: React.FC<
  PropsWithChildren<BottomToolbarDrawerProps>
> = ({ className, anchor, open, scale = 1, children, style = {}, bottom }) => {
  const divider = (
    <Divider
      style={{
        marginLeft: -24,
        marginRight: -24,
        marginTop: 12,
        marginBottom: 12,
      }}
    />
  );

  const blur = useBlurAllCells();
  const options = useOption('options');
  const isEditMode = useIsEditMode();

  const theChildren = React.Children.toArray(children).filter(Boolean);
  const isSmall = useIsSmallScreen();
  return (
    <Portal>
      <Drawer
        SlideProps={{
          mountOnEnter: true,
          unmountOnExit: true,
        }}
        variant="persistent"
        className={className}
        open={open}
        anchor={anchor}
        PaperProps={{
          style: {
            zIndex: 10,
            backgroundColor: 'transparent',
            border: 'none',
            overflow: 'visible',
            pointerEvents: 'none',
          },
        }}
      >
        <div
          style={{
            pointerEvents: 'all',
            padding: '12px 24px',
            marginBottom: 12,
            ...(isSmall
              ? {
                  marginLeft: 20,
                  marginRight: 80,
                }
              : {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  minWidth: '50vw',
                  maxWidth: 'min(1280px, calc(100vw - 250px))',
                }),
            position: 'relative',

            transformOrigin: 'bottom',
            transform: `scale(${scale})`,
            transition: 'scale 0.3s',
            ...style,
          }}
        >
          <Card>
            {isEditMode && options.haveCloseButton && (
              <Box
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
                onClick={() => {
                  blur();
                }}
                sx={{
                  cursor: 'pointer',
                  '&:active': {
                    '& path': {
                      opacity: 0.8,
                    },
                  },
                }}
                className="styled-editor-close-button"
              >
                <CloseSquare set="curved" />
              </Box>
            )}
            {theChildren.length > 0 && (
              <>
                <Card.Body>
                  {theChildren.map((child, index) => (
                    <Fragment key={index}>{child}</Fragment>
                  ))}
                </Card.Body>
                <Card.Divider />
              </>
            )}
            <Card.Footer>{bottom}</Card.Footer>
          </Card>
        </div>
      </Drawer>
    </Portal>
  );
};
