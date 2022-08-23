import React from 'react'
import { Button, Card, Grid, Modal, Text, useModal } from '@nextui-org/react'

import type { CellPluginMissingProps } from '../../types/plugins'

const PluginMissing: React.FC<CellPluginMissingProps> = ({
  children,
  ...props
}) => {
  const { setVisible, bindings } = useModal()

  return (
    <div>
      <Card>
        <Card.Header
          css={{
            justifyContent: 'space-between',
          }}>
          <Text>
            The requested plugin `{props.pluginId}` could not be found.
          </Text>
        </Card.Header>
        <Card.Footer>
          <Grid.Container gap={1}>
            <Grid>
              <Button auto color="error" onClick={props.remove}>
                Delete Plugin
              </Button>
            </Grid>
            <Grid>
              <Button
                auto
                onClick={() => {
                  setVisible(true)
                }}>
                Open logs
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
      {children}
      <Modal
        width="fit-content"
        scroll
        closeButton
        open={bindings.open}
        onClose={bindings.onClose}>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Modal>
    </div>
  )
}

export default PluginMissing
