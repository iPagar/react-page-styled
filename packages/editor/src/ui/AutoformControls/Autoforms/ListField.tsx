import { Box, Portal } from '@mui/material';
import { Card, Grid, Spacer, Table, Text } from '@nextui-org/react';
import React, {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
} from 'react';
import type {
  SortableContainerProps,
  SortableElementProps,
} from 'react-sortable-hoc';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import type { HTMLFieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';
import { useUiTranslator } from '../../../core/components/hooks';

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
  const { t } = useUiTranslator();
  const items = value?.map((item, itemIndex) =>
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
  );
  return (
    <ul
      {...filterDOMProps(props)}
      style={{
        paddingLeft: 0,
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
      }}
    >
      {label && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text small>{label}</Text>
          <Spacer x={1} />
          <ListAddField initialCount={initialCount} name="$" />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {items.length > 0 ? (
          <SortableList
            axis="xy"
            items={items}
            onSortEnd={(sortEnd) => {
              const { oldIndex, newIndex } = sortEnd;
              const newValue = [...value];
              newValue.splice(newIndex, 0, newValue.splice(oldIndex, 1)[0]);
              props.onChange(newValue);
            }}
          />
        ) : (
          <Text small>{t('Items not found')}</Text>
        )}
      </div>
    </ul>
  );
}

const SortableList = SortableContainer(
  ({
    items,
  }: SortableContainerProps & {
    items: React.ReactNode[];
  }) => {
    return (
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((value, index: number) => (
          <SortableItem
            key={index}
            index={index}
            value={value}
            sortIndex={index}
          />
        ))}
      </Box>
    );
  }
);

const SortableItem = SortableElement(
  ({
    value,
    sortIndex,
  }: SortableElementProps & {
    value: React.ReactNode;
    sortIndex: number;
  }) => {
    return (
      <div className="editor-sortable-item">
        <Card
          variant="bordered"
          style={{
            padding: 8,
          }}
        >
          <p
            style={{
              fontSize: '12px',
              margin: 4,
            }}
          >
            Item №{sortIndex + 1}
          </p>
          {value}
        </Card>
      </div>
    );
  }
);

export default connectField<ListFieldProps>(List);
