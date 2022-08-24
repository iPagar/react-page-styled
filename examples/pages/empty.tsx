import type { Value } from '@react-page-styled/editor';
import { ThemeProvider } from '@react-page-styled/editor';
import Editor from '@react-page-styled/editor';

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { cellPlugins } from '../plugins/cellPlugins';

const LANGUAGES = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];

export default function Empty() {
  const [value, setValue] = useState<Value | null>(null);

  return (
    <PageLayout>
      <ThemeProvider
        nextuiTheme={{
          type: 'light',
          theme: {
            colors: {
              errorLight: '#fce5de',
              primaryLight: 'black',
              secondaryLight: 'black',
              secondaryLightHover: 'black',
              secondaryLightContrast: 'black',
              primaryLightContrast: 'black',
              error: '#862a0d',
              secondary: 'black',
              primary: 'black',
              gradient:
                'linear-gradient(90deg, rgba(87,157,144,1) 0%, rgba(13,105,134,1) 100%)',
            },
          },
        }}
      >
        <Editor
          cellPlugins={cellPlugins}
          value={value}
          lang={LANGUAGES[0].lang}
          onChange={setValue}
          languages={LANGUAGES}
        />
      </ThemeProvider>
    </PageLayout>
  );
}
