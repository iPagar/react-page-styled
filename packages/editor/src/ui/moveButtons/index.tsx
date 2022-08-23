import type { CSSProperties } from 'react'
import React from 'react'

import IconUp from '@material-ui/icons/ArrowDropUp'
import IconDown from '@material-ui/icons/ArrowDropDown'
import IconRight from '@material-ui/icons/ArrowRight'
import IconLeft from '@material-ui/icons/ArrowLeft'
import {
  useMoveNodeDown,
  useMoveNodeUp,
  useMoveNodeLeft,
  useMoveNodeRight,
} from '../../core/components/hooks'
import { Button } from '@nextui-org/react'

const Base: React.FC<{
  onClick: null | (() => void)
  icon: NonNullable<React.ReactNode>
  style?: CSSProperties
}> = ({ onClick, icon, style }) => {
  return (
    <Button
      flat
      disabled={!onClick}
      style={{ pointerEvents: 'all', ...style }}
      auto
      onClick={onClick ?? undefined}
      color="default"
      icon={icon}
    />
  )
}

export const MoveUp: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveUp = useMoveNodeUp(nodeId)
  return <Base onClick={moveUp} icon={<IconUp />} style={style} />
}

export const MoveDown: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveDown = useMoveNodeDown(nodeId)
  return <Base onClick={moveDown} icon={<IconDown />} style={style} />
}

export const MoveLeft: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveLeft = useMoveNodeLeft(nodeId)
  return <Base onClick={moveLeft} icon={<IconLeft />} style={style} />
}

export const MoveRight: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveRight = useMoveNodeRight(nodeId)
  return <Base onClick={moveRight} icon={<IconRight />} style={style} />
}
