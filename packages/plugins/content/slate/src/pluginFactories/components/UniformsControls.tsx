// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import type { JsonSchema } from '@react-page-styled/editor';
import {
  makeUniformsSchema,
  AutoForm,
  AutoFields,
} from '@react-page-styled/editor';
import React, { useCallback, useRef, useState } from 'react';
import type { Data } from '../../types';
import { Button, Modal, Input, Tooltip, css } from '@nextui-org/react';

import type { SlatePluginControls } from '../../types/slatePluginDefinitions';

function Controls<T extends Data>(
  props: SlatePluginControls<T> & {
    schema?: JsonSchema<T>;
  }
) {
  const uniformsSchema = props.schema
    ? makeUniformsSchema<T>(props.schema)
    : null;

  const hasSchema = Boolean(props.schema);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>();

  const [text, setText] = useState<string | null>(null);

  const onCancel = () => {
    props.close();
  };

  const saveAndCloseWithData = useCallback(
    (data) => {
      props.close();
      if (props.shouldInsertWithText) {
        props.add({ text, data });
      } else {
        props.add({ data });
      }
    },
    [props.shouldInsertWithText, text]
  );

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [formRef.current]);

  const onOkClick = useCallback(() => {
    if (uniformsSchema) {
      submitForm();
    } else {
      saveAndCloseWithData({});
    }
  }, [submitForm, saveAndCloseWithData, hasSchema]);
  const onRemove = () => {
    props.remove();
    props.close();
  };

  return (
    <Modal open={props.open}>
      <Modal.Body>
        {!props.shouldInsertWithText ? null : (
          <Input
            auto
            label="Text"
            autoFocus={true}
            placeholder={'Text'}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        )}

        {hasSchema && uniformsSchema ? (
          <AutoForm
            ref={formRef}
            model={props.data}
            schema={uniformsSchema}
            onSubmit={saveAndCloseWithData}
          >
            <AutoFields />
          </AutoForm>
        ) : null}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button auto flat color="secondary" onClick={onCancel}>
          {props.cancelLabel || 'Cancel'}
        </Button>
        <div
          style={{
            display: 'flex',
            gap: 4,
          }}
        >
          {props.isActive ? (
            <Tooltip content={props.removeLabel || 'Remove'}>
              <Button
                flat
                auto
                color="error"
                onClick={onRemove}
                icon={<DeleteIcon />}
              />
            </Tooltip>
          ) : null}

          <Button auto color="primary" onClick={onOkClick}>
            {props.submitLabel || 'Ok'}
            <DoneIcon style={{ marginLeft: 10 }} />
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Controls;
