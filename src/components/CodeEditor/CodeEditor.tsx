'use client';

import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';

import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import React from 'react';

interface CodeEditorProps extends ReactCodeMirrorProps {
  language: 'javascript' | 'json';
}

export const CodeEditor = ({ language, ...props }: CodeEditorProps) => {
  const themeContext = useTheme();
  const editorTheme = themeContext.resolvedTheme === 'light' ? vscodeLight : vscodeDark;

  return (
    <CodeMirror
      theme={editorTheme}
      extensions={[language === 'json' ? json() : javascript({ typescript: true })]}
      placeholder='Write code...'
      {...props}
    />
  );
};
