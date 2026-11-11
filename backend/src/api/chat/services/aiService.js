import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'missing-key',
  baseURL: process.env.OPENAI_BASE_URL || undefined,
});

export const SYSTEM_PROMPT = `You are a helpful assistant that ONLY answers questions about programming, software engineering, computer science, and IT (e.g. languages, frameworks, databases, algorithms, DevOps, networking, debugging, tooling).
If the user asks about anything else, politely decline in one or two sentences, say you can only help with programming and IT topics, and invite them to ask a related question. Do not answer the off-topic question, even partially.
Format answers in Markdown and use fenced code blocks with a language tag for code.`;

export async function generateAnswer(history) {
  const completion = await client.chat.completions.create({
    model: process.env.AI_MODEL || 'gpt-4o-mini',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
  });
  const answer = completion.choices?.[0]?.message?.content;
  if (!answer) throw new Error('Empty response from AI provider');
  return answer;
}
