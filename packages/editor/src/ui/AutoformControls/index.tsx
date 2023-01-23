import { Card, Grid } from '@nextui-org/react';
import React, { Fragment, useEffect, useMemo } from 'react';
import type JSONSchemaBridge from 'uniforms-bridge-json-schema';
import { useIsSmallScreen } from '../../core/components/hooks';
import lazyLoad from '../../core/helper/lazyLoad';

import type {
  AutoformControlsDef,
  CellPluginComponentProps,
  DataTType,
  JsonSchema,
} from '../../core/types';
import makeUniformsSchema from './makeUniformsSchema';

export const AutoForm = lazyLoad(() => import('./AutoForm'));
export const AutoField = lazyLoad(() => import('./AutoField'));
export const AutoFields = lazyLoad(() => import('./AutoFields'));

const getDefaultValue = function (bridge: JSONSchemaBridge): {
  [key: string]: unknown;
} {
  return bridge.getSubfields().reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: bridge.getInitialValue(fieldName),
    }),
    {}
  );
};

type Props<T extends DataTType> = CellPluginComponentProps<T> &
  AutoformControlsDef<T>;
export function AutoformControls<T extends DataTType>({
  onChange,
  data,
  schema,
  columnCount = 2,
  Content,
}: Props<T>) {
  const bridge = useMemo(
    () => makeUniformsSchema<T>(schema as JsonSchema<T>),
    [schema]
  );
  useEffect(() => {
    const newDefaultData = {
      ...getDefaultValue(bridge),
      ...(data ?? {}),
    } as Partial<T>;
    onChange(newDefaultData);
  }, [bridge]);
  const isSmall = useIsSmallScreen();

  return (
    <AutoForm
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model={data as any}
      autosave={true}
      schema={bridge}
      onSubmit={onChange}
    >
      {Content ? (
        <Content data={data} columnCount={columnCount} />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${isSmall ? 1 : columnCount}, 1fr)`,
            gridGap: 8,
          }}
        >
          <AutoFields element={Fragment} />
        </div>
      )}
    </AutoForm>
  );
}
