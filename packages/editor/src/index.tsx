//import './wdyr';
export * from './core/types';
export * from './core/components/hooks';
export * from './ui';

import lazyLoad from './core/helper/lazyLoad';
import { Migration } from './core/migrations/Migration';

import type { EditorProps } from './editor/Editor';
import Editor from './editor/Editor';
import makeUniformsSchema from './ui/AutoformControls/makeUniformsSchema';

import { migrateValue } from './core/migrations/migrate';
import deepEquals from './core/utils/deepEquals';

import { createValue } from './core/utils/createValue';
import { objIsNode } from './core/utils/objIsNode';
import { getTextContents } from './core/utils/getTextContents';
export { objIsNode };
export { lazyLoad };
export type { EditorProps };
export { Migration };
export { makeUniformsSchema };
export { createValue, getTextContents };
export { migrateValue };
export { ThemeProvider } from './ui/ThemeProvider';

export { deepEquals };
export default Editor;

export const VERSION = '###VERSION###';
