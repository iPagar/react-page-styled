import { Button } from '@nextui-org/react';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';
import { useUiTranslator } from '../../../core/components/hooks';

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  HTMLSpanElement,
  { initialCount?: number }
>;

function ListAdd({
  disabled,
  initialCount,
  name,
  readOnly,
  value,
  ...props
}: ListAddFieldProps) {
  const { t } = useUiTranslator();
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<
    { initialCount?: number; maxCount?: number },
    unknown[]
  >(parentName, { initialCount }, { absoluteName: true })[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  function onAction(event: React.KeyboardEvent | React.MouseEvent) {
    if (
      limitNotReached &&
      !readOnly &&
      (!('key' in event) || event.key === 'Enter')
    ) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
    }
  }

  return (
    <span {...filterDOMProps(props)}>
      <Button
        auto
        disabled={!limitNotReached}
        onClick={onAction}
        onKeyDown={onAction}
        role="button"
        tabIndex={0}
      >
        {t('Add')}
      </Button>
    </span>
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
