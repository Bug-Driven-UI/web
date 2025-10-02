'use client';

import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import type { JSONSchema7 } from 'json-schema';

import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { jsonSchema } from 'codemirror-json-schema';
import { useTheme } from 'next-themes';

interface JsonCodeEditorProps extends ReactCodeMirrorProps {
  schema: JSONSchema7;
}

export const JsonCodeEditor = ({ schema, ...props }: JsonCodeEditorProps) => {
  const themeContext = useTheme();
  const editorTheme = themeContext.resolvedTheme === 'light' ? vscodeLight : vscodeDark;

  return (
    <CodeMirror
      theme={editorTheme}
      extensions={[json(), jsonSchema(schema)]}
      placeholder='{ "type": "string" }'
      {...props}
    />
  );
};
