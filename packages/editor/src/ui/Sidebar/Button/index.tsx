import React from 'react'

import type { PropTypes } from '@material-ui/core'
import { useIsSmallScreen } from '../../../core/components/hooks'
import { Button, ButtonProps, Tooltip, TooltipProps } from '@nextui-org/react'

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
  activeColor = 'secondary',
  style,
  placement,
  ...rest
}: {
  description: string
  icon: JSX.Element
  active?: boolean
  disabled?: boolean
  activeColor?: ButtonProps['color']
  onClick: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  placement?: TooltipProps['placement']
} & unknown) => {
  const isSmall = useIsSmallScreen()
  return (
    <Button.Group
      color={active ? activeColor : 'primary'}
      css={{
        margin: 0,
      }}>
      <Tooltip
        placement={placement ?? 'left'}
        content={description}
        css={{
          width: 'fit-content',
        }}>
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
  )
}

export default DisplayModeToggle
