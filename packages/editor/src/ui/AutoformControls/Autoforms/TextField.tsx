import { Input, Textarea } from '@nextui-org/react';
import type { HTMLProps, Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  { inputRef?: Ref<HTMLInputElement> }
>;

function Text({
  autoComplete,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  type,
  value,
  ...props
}: TextFieldProps) {
  const multiline = 'multiline' in props;

  return (
    <div {...filterDOMProps(props)}>
      {!multiline ? (
        <Input
          fullWidth
          label={(label as string) ?? ''}
          autoComplete={autoComplete}
          disabled={disabled}
          id={id}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={inputRef}
          type={type}
          value={value ?? ''}
        />
      ) : (
        <Textarea
          fullWidth
          label={(label as string) ?? ''}
          autoComplete={autoComplete}
          disabled={disabled}
          id={id}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={inputRef}
          type={type}
          value={value ?? ''}
          rows={props.rows}
        />
      )}
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
