import React, { useState } from 'react';
import type { Options, Value } from '@react-page-styled/editor';
import Editor from '@react-page-styled/editor';
import slate from '@react-page-styled/plugins-slate';
import image from '@react-page-styled/plugins-image';
import { ExampleCustomBottomToolbar } from '../../components/ExampleCustomBottomToolbar';
import { Button } from '@mui/material';
import customContentPlugin from '../../plugins/customContentPlugin';

const cellPlugins = [slate(), image, customContentPlugin];

// Custom bottom toolbar example with collapse/restore functionality.
const customToolbarExample = () => {
  const [value, setValue] = React.useState<Value | null>(null);

  const [useCustom, setUseCustom] = useState(true);
  // make sure that you memoize custom components property to avoid unnesseary rerenders
  const components = React.useMemo<Options['components']>(
    () => (useCustom ? { BottomToolbar: ExampleCustomBottomToolbar } : {}),
    [useCustom]
  );

  return (
    <>
      <Button onClick={() => setUseCustom(!useCustom)}>
        Toggle custom toolbar
      </Button>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        components={components}
      />
    </>
  );
};

export default customToolbarExample;
