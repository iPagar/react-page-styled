import { Input } from '@nextui-org/react'
import React, { Ref } from 'react'
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms'

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement> }
>

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
  return (
    <div {...filterDOMProps(props)}>
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
    </div>
  )
}

Text.defaultProps = { type: 'text' }

export default connectField<TextFieldProps>(Text, { kind: 'leaf' })
