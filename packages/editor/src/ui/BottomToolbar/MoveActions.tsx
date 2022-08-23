import { Button } from '@nextui-org/react'
import React from 'react'
import { MoveLeft, MoveRight, MoveDown, MoveUp } from '../moveButtons'
const MoveActions: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  return (
    <Button.Group
      css={{
        margin: 0,
      }}>
      <MoveLeft nodeId={nodeId} />
      <MoveUp nodeId={nodeId} />

      <MoveDown nodeId={nodeId} />
      <MoveRight nodeId={nodeId} />
    </Button.Group>
  )
}

export default MoveActions
