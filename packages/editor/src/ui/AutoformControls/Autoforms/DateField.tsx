import type { Ref } from 'react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date) => value?.toISOString().slice(0, -8);

export type DateFieldProps = HTMLFieldProps<
  Date,
  HTMLDivElement,
  {
    inputRef?: Ref<HTMLInputElement>;
    max?: Date;
    min?: Date;
    type?: 'date' | 'datetime-local';
  }
>;

function Date({
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
  value,
  type,
  ...props
}: DateFieldProps) {
  const dateType = type === 'date' ? type : 'datetime-local';

  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        disabled={disabled}
        id={id}
        max={dateFormat(max)}
        min={dateFormat(min)}
        name={name}
        onChange={(event) => {
          const date = new DateConstructor(event.target.valueAsNumber);
          if (date.getFullYear() < 10000) {
            onChange(date);
          } else if (isNaN(event.target.valueAsNumber)) {
            onChange(undefined);
          }
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={dateType}
        value={dateFormat(value) ?? ''}
      />
    </div>
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
