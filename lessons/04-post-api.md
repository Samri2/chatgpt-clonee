# Lesson 4 – POST API, AI, system prompt

**Goal:** `POST /api/chat/conversations` validates, saves, asks AI, saves, returns both.

## Concepts
- **Validation:** never trust `req.body`. Check `question` is a non-empty string -> else 400.
- **System prompt:** a first message with role `system` that sets the assistant's rules.
- **History:** send recent messages so the AI has context.
- Order matters: save user msg -> AI -> save assistant msg.

## Tasks
1. Validation in the controller (400 + `{ success:false, message }`).
2. `npm i openai`; add `OPENAI_API_KEY` (and optional `OPENAI_BASE_URL`, `AI_MODEL`) to `.env`.
3. `aiService.js`: create the client, write `SYSTEM_PROMPT` (programming / software engineering / CS / IT only; politely decline & redirect otherwise), export `generateAnswer(history)`.
4. Controller: insert user row (`insertId`), load last ~20 messages, call AI, insert assistant row, fetch both rows by id, return 201 with `{ userConversation, assistantConversation }`.

## Hints
- `const [result] = await pool.query('INSERT ...', [a, b])` -> `result.insertId`.
- `client.chat.completions.create({ model, messages })`; answer is in `choices[0].message.content`.
- Messages look like `{ role: 'user' | 'assistant' | 'system', content }`.

## Checkpoint
Postman POST `{"question":"What is a closure in JavaScript?"}` returns both messages. `"What should I eat for dinner?"` gets a polite redirect.

## Think about
What if the AI call fails after the user row was saved? (Lesson 6.)

## Commands you'll run
```bash
cd ~/project/Evangadi/phase-4/week-1/chatgpt/backend
npm install openai
npm run dev

# test from the terminal (or use Postman: Body -> raw -> JSON)
curl -X POST http://localhost:3777/api/chat/conversations \
  -H "Content-Type: application/json" \
  -d '{"question":"What is a closure in JavaScript?"}'

curl -X POST http://localhost:3777/api/chat/conversations \
  -H "Content-Type: application/json" \
  -d '{"question":"What should I eat for dinner?"}'

# check what was saved
docker exec chatgpt-mysql mysql -uroot -pchangeme -e "SELECT id, role, LEFT(content,60) FROM chatgpt_clone.conversations"
```
`.env` additions (you type your own key, never share it): `OPENAI_API_KEY=...`, `AI_MODEL=gpt-4o-mini`.
