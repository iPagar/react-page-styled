import { Checkbox, Text } from '@nextui-org/react';
import type { Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type BoolFieldProps = HTMLFieldProps<
  boolean,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Bool({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  readOnly,
  value,
  ...props
}: BoolFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      <Checkbox
        isSelected={value || false}
        isDisabled={disabled}
        id={id}
        name={name}
        onChange={() => !disabled && !readOnly && onChange(!value)}
      >
        {label && <Text>{label}</Text>}
      </Checkbox>
    </div>
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
