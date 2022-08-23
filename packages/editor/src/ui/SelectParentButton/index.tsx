import IconButton from '@material-ui/core/IconButton'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import { Button, Tooltip } from '@nextui-org/react'

import React from 'react'
import {
  useFocusCell,
  useParentCellId,
  useUiTranslator,
} from '../../core/components/hooks'

export const SelectParentButton: React.FC<{
  nodeId: string
}> = React.memo(({ nodeId }) => {
  const parentCellId = useParentCellId(nodeId)
  const { t } = useUiTranslator()
  const focusParent = useFocusCell(parentCellId)

  return parentCellId ? (
    <Tooltip content={t('Select parent') ?? ''}>
      <Button
        flat
        auto
        onClick={() => focusParent()}
        color="default"
        icon={<VerticalAlignTopIcon />}
      />
    </Tooltip>
  ) : null
})
