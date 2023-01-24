import { Hidden } from '@mui/material';
import { Avatar, Dropdown, Text } from '@nextui-org/react';
import xor from 'lodash/xor';
import type { Ref, RefObject } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ (x) => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    disableItem?: (value: string) => boolean;
    inputRef?: RefObject<HTMLElement>;
    transform?: (value: string) => string;
  }
>;

function Select({
  allowedValues,
  checkboxes,
  disabled,
  fieldType,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  disableItem,
  transform,
  value,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;

  return (
    <div {...filterDOMProps(props)}>
      {label && <Text small>{label}</Text>}
      {checkboxes ? (
        allowedValues.map((item) => (
          <div key={item}>
            <input
              checked={
                fieldType === Array ? value.includes(item) : value === item
              }
              disabled={disableItem?.(item) ?? disabled}
              id={`${id}-${escape(item)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(fieldType === Array ? xor([item], value) : item);
                }
              }}
              type="checkbox"
            />

            <label htmlFor={`${id}-${escape(item)}`}>
              {transform ? transform(item) : item}
            </label>
          </div>
        ))
      ) : (
        <Dropdown ref={inputRef}>
          <Dropdown.Button flat disabled={disabled}>
            {value ? (Array.isArray(value) ? value.join(', ') : value) : label}
          </Dropdown.Button>
          <Dropdown.Menu
            disabledKeys={[
              ...(disableItem ? allowedValues?.filter(disableItem) : []),
              (placeholder || label) && '',
              ...(typeof value === 'string' ? [value] : value),
            ]}
            id={id}
            selectedKeys={Array.isArray(value) ? value : [value]}
            selectionMode={multiple ? 'multiple' : 'single'}
            onSelectionChange={(selection) => {
              const selected = Array.from(selection);
              if (!readOnly) {
                const item = selected as string[];
                if (multiple) {
                  onChange(xor(item, value));
                } else {
                  onChange(item[0]);
                }
              }
            }}
          >
            {[
              (placeholder || label) && !multiple && (
                <Dropdown.Item key="">{placeholder || label}</Dropdown.Item>
              ),
              ...allowedValues?.map((value) => (
                <Dropdown.Item
                  key={value}
                  css={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    '& span': {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    },
                  }}
                >
                  {transform ? transform(value) : value}
                </Dropdown.Item>
              )),
            ]}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
