import { Button, Card, Text } from '@nextui-org/react'
import React from 'react'
import { useIsEditMode, useRemoveCell, useUiTranslator } from '../../hooks'

const ErrorCell: React.FC<{ nodeId: string; error: Error }> = ({
  nodeId,
  error,
}) => {
  const isEditMode = useIsEditMode()
  const removeCell = useRemoveCell(nodeId)
  const { t } = useUiTranslator()
  return (
    <Card>
      <Card.Header>
        <Text b>{t('An error occurred!')}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <small>
          <dl>
            <dt>{t('Cause:')}</dt>
            <dd>{error.message}</dd>
            <dt>{t('Cell:')}</dt>
            <dd>{nodeId}</dd>
          </dl>
        </small>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        {isEditMode ? (
          <Button auto color="error" onClick={() => removeCell()}>
            {t('Remove')}
          </Button>
        ) : null}
      </Card.Footer>
    </Card>
  )
}

export default ErrorCell
