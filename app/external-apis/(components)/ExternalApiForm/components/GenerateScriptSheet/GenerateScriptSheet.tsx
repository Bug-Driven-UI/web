'use client';

import React from 'react';

import type { GeminiRequestParams } from '@/src/utils/api/gemini/instance';

import {
  Button,
  CodeEditor,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea
} from '@/src/components/ui';

interface GenerateScriptSheetProps {
  responseAliases: string[];
  responseJsonSchema: unknown;
  trigger: React.ReactNode;
}

export const GenerateScriptSheet = ({
  responseAliases,
  responseJsonSchema,
  trigger
}: GenerateScriptSheetProps) => {
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const onSubmit = async () => {
    const body: GeminiRequestParams = { responseAliases, prompt, responseJsonSchema };
    setLoading(true);
    const geminiResponse = await fetch('/gemini', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      }
    });
    setLoading(false);

    if (!geminiResponse.ok || !geminiResponse.body) {
      console.error('Bad response', geminiResponse.status);
      return;
    }

    const decoded = geminiResponse.body.pipeThrough(new TextDecoderStream());
    const reader = decoded.getReader();

    let full = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      full += value;
      setAnswer(full);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className='max-w-2xl sm:max-w-3xl'>
        <SheetHeader>
          <SheetTitle className='flex justify-between'>
            Сгенерировать маппинг скрипт с помощью AI
          </SheetTitle>
          <SheetDescription>
            Опишите в каком формате приходят данные из описанных ендпоинтов API с указанием алиаса
            для них
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col justify-between gap-4 overflow-auto p-4 pt-0'>
          <Textarea
            className='border-0 focus:ring-0'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Type your prompt'
            rows={10}
          />
          <CodeEditor
            className='h-[480px] w-full transition-all duration-300 ease-in-out'
            delay={0.2}
            lang='js'
            title='script.js'
            writing={false}
            copyButton
            cursor
            duration={15}
            loading={loading}
          >
            {answer}
          </CodeEditor>

          <Button className='self-flex-end w-full' onClick={onSubmit}>
            Сгенерировать скрипт
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
