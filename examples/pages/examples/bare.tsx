import React, { useState } from 'react';
import type { Value } from '@react-page-styled/editor';
import Editor from '@react-page-styled/editor';
import slate from '@react-page-styled/plugins-slate';
import image from '@react-page-styled/plugins-image';

const cellPlugins = [slate(), image];

// Bare without page layout for bundle size debugging
const Bare = () => {
  const [value] = useState<Value | null>(null);

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} />
    </>
  );
};
export default Bare;
