import { Button, Tooltip, useTheme } from '@nextui-org/react';
import { lazyLoad } from '@react-page-styled/editor';
import React from 'react';
import { ConditionalWrapper } from './ConditionalWrapper';

const ToolbarButton: React.SFC<{
  icon: JSX.Element | string;
  isActive: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  toolTip?: string;
}> = ({ icon, isActive, onClick, disabled = false, toolTip = '' }) => {
  const { theme } = useTheme();

  return (
    <ConditionalWrapper
      condition={!disabled}
      wrapper={(children) => <Tooltip content={toolTip}>{children}</Tooltip>}
    >
      <Button
        ripple={false}
        light
        auto
        onClick={onClick}
        style={
          isActive
            ? { color: theme.colors.primary.value }
            : disabled
            ? { color: 'gray' }
            : { color: 'black' }
        }
        disabled={disabled}
        icon={icon}
      ></Button>
    </ConditionalWrapper>
  );
};

export default React.memo(ToolbarButton);
