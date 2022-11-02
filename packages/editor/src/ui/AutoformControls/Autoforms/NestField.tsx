import { Text } from '@nextui-org/react';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { itemProps?: object }
>;

function Nest({
  children,
  fields,
  itemProps,
  label,
  ...props
}: NestFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <Text small>{label}</Text>}
      {children ||
        fields.map((field) => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField<NestFieldProps>(Nest);
