import { NextResponse } from 'next/server';

import type { GeminiRequestParams } from '@/src/utils/api/gemini/instance';

import { geminiInstance } from '@/src/utils/api/gemini/instance';

import { getSystemPrompt } from './(helpers)/getSystemPrompt';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { prompt, responseAliases, responseJsonSchema } = (await req.json()) as GeminiRequestParams;

  const systemPrompt = getSystemPrompt({
    responseAliases,
    aliasesJsonSchemas: prompt,
    responseJsonSchema: JSON.stringify(responseJsonSchema)
  });

  try {
    const contentStream = await geminiInstance.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: systemPrompt.map((part) => ({ text: part })) }],
      config: { temperature: 0.2, responseMimeType: 'text/plain' }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of contentStream) {
          controller.enqueue(encoder.encode(chunk.text ?? ''));
        }
        controller.close();
      }
    });

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch (error) {
    console.error(error);

    return new NextResponse('', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
