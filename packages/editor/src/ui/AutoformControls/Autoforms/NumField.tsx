import { Input } from '@nextui-org/react';
import type { Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type NumFieldProps = HTMLFieldProps<
  number,
  HTMLDivElement,
  { decimal?: boolean; inputRef?: Ref<HTMLInputElement> }
>;

function Num({
  decimal,
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  step,
  value,
  ...props
}: NumFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      <Input
        fullWidth
        label={(label as string) ?? ''}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={(event) => {
          const parse = decimal ? parseFloat : parseInt;
          const value = parse(event.target.value);
          onChange(isNaN(value) ? undefined : value);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        step={step || (decimal ? 0.01 : 1)}
        type="number"
        value={value ?? ''}
      />
    </div>
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
