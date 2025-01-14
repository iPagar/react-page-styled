import type { ReactNode } from 'react';
import React from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <ListDelField name="" />
      </div>
    </div>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
