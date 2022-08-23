import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Card, Text } from '@nextui-org/react'

import React from 'react'
import type { PluginDrawerLabels } from '..'
import {
  useDisplayModeReferenceNodeId,
  useInsertNew,
  useUiTranslator,
} from '../../../core/components/hooks'
import type { CellPlugin, InsertNewCell } from '../../../core/types'
import Draggable from '../Draggable/index'

type ItemProps = {
  plugin: CellPlugin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: InsertNewCell
  translations: PluginDrawerLabels
}

const Item: React.FC<ItemProps> = ({ plugin, insert }) => {
  const title = plugin.title ?? plugin.text
  const { t } = useUiTranslator()
  if (!plugin.icon && !title) {
    return null
  }

  const referenceNodeId = useDisplayModeReferenceNodeId()
  const insertNew = useInsertNew(referenceNodeId)
  const insertIt = React.useCallback(
    () => insertNew(insert),
    [insertNew, referenceNodeId, insert]
  )

  return (
    <Draggable insert={insert}>
      <ListItem
        title={
          t('Click to add or drag and drop it somewhere on your page!') ?? ''
        }
        onClick={insertIt}>
        <Card
          isHoverable
          css={{
            cursor: 'pointer',
          }}>
          <Card.Header>
            <Avatar
              children={plugin.icon || title?.[0]}
              style={{
                marginRight: 16,
              }}
            />
            <Text b>{t(title)}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text>{t(plugin.description) ?? 'No description'}</Text>
          </Card.Body>
        </Card>
      </ListItem>
    </Draggable>
  )
}

export default Item
