import React from 'react';

import type { PropTypes } from '@mui/material';
import { useIsSmallScreen } from '../../../core/components/hooks';
import type { ButtonProps, TooltipProps } from '@nextui-org/react';
import { Button, Tooltip } from '@nextui-org/react';
import { createPortal } from 'react-dom';

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
  activeColor = 'secondary',
  style,
  placement,
  tooltipStyle,
  ...rest
}: {
  description: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  activeColor?: ButtonProps['color'];
  onClick: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  placement?: TooltipProps['placement'];
  tooltipStyle?: React.CSSProperties;
} & unknown) => {
  const isSmall = useIsSmallScreen();
  return (
    <Button.Group
      color={active ? activeColor : 'primary'}
      css={{
        margin: 0,
      }}
    >
      <Tooltip
        placement={placement ?? 'left'}
        content={description}
        css={{
          width: 'fit-content',
          whiteSpace: 'nowrap',
          ...tooltipStyle,
        }}
      >
        <Button
          auto
          size={isSmall ? 'sm' : 'md'}
          onClick={onClick}
          disabled={disabled}
          icon={icon}
          style={style}
          {...rest}
        />
      </Tooltip>
    </Button.Group>
  );
};

export default DisplayModeToggle;
