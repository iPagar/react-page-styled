import { Input, Textarea } from '@nextui-org/react';
import type { HTMLProps, Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  { inputRef?: Ref<HTMLInputElement>; textareaRef?: Ref<HTMLTextAreaElement> }
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
  textareaRef,
  ...props
}: TextFieldProps) {
  const multiline = 'multiline' in props;

  return (
    <div {...filterDOMProps(props)}>
      {!multiline ? (
        <Input
          status={props.error ? 'error' : 'default'}
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
          status={props.error ? 'error' : 'default'}
          fullWidth
          label={(label as string) ?? ''}
          autoComplete={autoComplete}
          disabled={disabled}
          id={id}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={textareaRef}
          value={value ?? ''}
          rows={props.rows}
        />
      )}
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
