import { Button } from '@nextui-org/react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';

export type ListDelFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListDel({ disabled, name, readOnly, ...props }: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  function onAction(
    event:
      | React.KeyboardEvent<HTMLSpanElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (
      limitNotReached &&
      !readOnly &&
      (!('key' in event) || event.key === 'Enter')
    ) {
      const value = parent.value!.slice();
      value.splice(nameIndex, 1);
      parent.onChange(value);
    }
  }

  return (
    <span {...filterDOMProps(props)}>
      <Button
        color="error"
        onClick={onAction}
        onKeyDown={onAction}
        role="button"
        tabIndex={0}
      >
        Удалить
      </Button>
    </span>
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});