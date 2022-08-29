import type { CellPlugin } from '@react-page/editor';
import React from 'react';
import { defaultSlate, customizedSlate } from './slate';

const customLayoutPlugin: CellPlugin<{
  backgroundColor: string;
  text: string;
}> = {
  Renderer: ({ data }) => {
    return (
      <div
        style={{
          border: '1px solid black',
          backgroundColor: data.backgroundColor,
          whiteSpace: 'pre-wrap',
        }}
      >
        {data.text}
      </div>
    );
  },
  id: 'custom-layout-plugin',
  title: 'Custom layout plugin',
  description: 'Some custom layout plugin',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string' },
        text: {
          type: 'string',
          uniforms: {
            multiline: true,
            rows: 10,
          },
        },
      },
    },
  },
};

export default customLayoutPlugin;
