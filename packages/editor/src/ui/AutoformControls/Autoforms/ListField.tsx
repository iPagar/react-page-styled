import { Grid, Spacer, Table } from '@nextui-org/react';
import React, { Children, cloneElement, isValidElement } from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLUListElement,
  { initialCount?: number; itemProps?: object }
>;

function List({
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  return (
    <ul {...filterDOMProps(props)}>
      {label && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {label}
          <Spacer x={1} />
          <ListAddField initialCount={initialCount} name="$" />
        </div>
      )}
      <Grid.Container gap={1}>
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) => (
            <Grid>
              {isValidElement(child)
                ? cloneElement(child, {
                    key: `${itemIndex}-${childIndex}`,
                    name: child.props.name?.replace('$', '' + itemIndex),
                    ...itemProps,
                  })
                : child}
            </Grid>
          ))
        )}
      </Grid.Container>
    </ul>
  );
}

export default connectField<ListFieldProps>(List);
