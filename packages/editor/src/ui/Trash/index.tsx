import Fab from '@material-ui/core/Fab'
import Delete from '@material-ui/icons/Delete'
import { Button } from '@nextui-org/react'
import classNames from 'classnames'
import React from 'react'
import { useIsLayoutMode, useTrashDrop } from '../../core/components/hooks'

export const Trash: React.FC = React.memo(() => {
  const isLayoutMode = useIsLayoutMode()
  const [{ isHovering }, ref] = useTrashDrop()
  return (
    <div
      ref={ref}
      className={classNames('react-page-controls-trash', {
        'react-page-controls-trash-active': isLayoutMode,
      })}>
      <Button
        flat
        auto
        color="error"
        disabled={!isHovering}
        icon={<Delete />}
      />
    </div>
  )
})
