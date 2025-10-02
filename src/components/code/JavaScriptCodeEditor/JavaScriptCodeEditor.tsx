'use client';

import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';

import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';

type JavaScriptCodeEditorProps = ReactCodeMirrorProps;

export const JavaScriptCodeEditor = (props: JavaScriptCodeEditorProps) => {
  const themeContext = useTheme();
  const editorTheme = themeContext.resolvedTheme === 'light' ? vscodeLight : vscodeDark;

  return (
    <CodeMirror
      theme={editorTheme}
      extensions={[javascript({ typescript: true })]}
      placeholder='return usersAlias.map((user) => user.name);'
      {...props}
    />
  );
};
