import { Textarea } from '@nextui-org/react';
import type { Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>;

function LongText({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  ...props
}: LongTextFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <Textarea
        disabled={disabled}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        value={value ?? ''}
      />
    </div>
  );
}

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
