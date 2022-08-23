// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { Button, Modal, Tooltip } from '@nextui-org/react';
import type { JsonSchema } from '@react-page/editor';
import { makeUniformsSchema, AutoForm, AutoFields } from '@react-page/editor';
import React, { useCallback, useRef, useState } from 'react';
import type { Data } from '../../types';
import TextField from '@material-ui/core';

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

  const [text, setText] = useState(null);

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
          <div>
            <TextField
              autoFocus={true}
              placeholder={'Text'}
              onChange={(e) => setText(e.target.value)}
              value={text}
              name={''}
            />
          </div>
        )}

        {hasSchema ? (
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
      <Modal.Footer>
        {props.isActive ? (
          <Tooltip content={props.removeLabel || 'Remove'}>
            <Button
              flat
              auto
              color="error"
              onClick={onRemove}
              icon={<DeleteIcon />}
            ></Button>
          </Tooltip>
        ) : null}
        <Button auto flat color="error" onClick={onCancel}>
          {props.cancelLabel || 'Cancel'}
        </Button>

        <Button auto color="primary" onClick={onOkClick}>
          {props.submitLabel || 'Ok'}
          <DoneIcon style={{ marginLeft: 10 }} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Controls;
