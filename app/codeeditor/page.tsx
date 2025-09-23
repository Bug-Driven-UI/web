'use client';

import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import React from 'react';

const EditorPage = () => {
  const themeContext = useTheme();
  const [code, setCode] = React.useState('');
  const editorTheme = themeContext.resolvedTheme === 'light' ? vscodeLight : vscodeDark;

  return (
    <div>
      <CodeMirror
        height='500px'
        theme={editorTheme}
        value={code}
        extensions={[javascript({ typescript: true })]}
        onChange={(value) => {
          setCode(value);
          console.log('value:', value);
        }}
        placeholder='Write javascript mapping script...'
      />

      <CodeMirror
        className='mt-6'
        height='200px'
        theme={editorTheme}
        value=''
        extensions={[json()]}
        onChange={(value) => {
          console.log('value:', value);
        }}
        placeholder='Write json...'
      />
    </div>
  );
};

export default EditorPage;
