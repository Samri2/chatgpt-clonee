# ChatGPT Clone – Presentation Prep

## 1. One-sentence pitch
A full-stack chat app: a React UI sends your question to an Express API, which saves it in MySQL, asks an AI model for an answer, saves that too, and shows it in the chat. The AI is restricted by a system prompt to programming and IT topics.

## 2. Talk outline (about 5-7 minutes)
1. **Goal** (30s): what the app does and the rule "programming topics only".
2. **Architecture** (60s): draw this on a slide or board.
   ```
   React (Vite, :5173) --axios--> Express API (:3777) --> MySQL (conversations table)
                                          \--> AI model (system prompt + last 20 messages)
   ```
3. **Backend** (90s):
   - Routes: `GET` and `POST /api/chat/conversations`.
   - POST flow: validate -> save user message -> call AI -> save answer -> return both.
   - Error handling: 400 bad input, 500 database, 502 AI provider.
4. **Database** (30s): one table: `id`, `role` (user or assistant), `content`, `created_at`.
5. **System prompt** (30s): show the text, and explain why it is the "guardrail".
6. **Frontend** (60s): components (Sidebar, Header, MessageList, ChatMessage, ChatInput), Axios calls, Markdown and code highlighting, sample chats.
7. **Live demo** (2 min): see section 3.
8. **Challenges and lessons** (45s): see section 5.
9. **Next steps** (20s): multiple conversations, login, streaming answers.

## 3. Demo script (rehearse it twice)
Before you start: MySQL running, backend running, frontend open, `.env` key valid.
1. Open the app: saved history loads from the database.
2. Ask: *What is a closure in JavaScript?* A formatted answer with a code block appears. Click **Copy code**.
3. Ask: *What should I eat for dinner?* The assistant politely declines. This proves the system prompt works.
4. **Refresh the page.** The messages are still there, because they come from MySQL.
5. Show the data: `docker exec chatgpt-mysql mysql -uroot -pchangeme -e "SELECT id, role, LEFT(content,50) FROM chatgpt_clone.conversations"`
6. Optional: open Postman and show `POST` with `{}`, which returns a 400 with a clear message.
7. Optional: stop the backend and send a message. The UI shows an error message instead of crashing.

## 4. Likely questions and short answers
- **Why store messages in a database?** So history survives refreshes and restarts, and so the AI gets context.
- **How does the AI remember the conversation?** We send the last 20 messages from the database with every request.
- **How do you restrict the topics?** A system prompt: a hidden first message that tells the model to answer only programming/IT questions and decline everything else.
- **Can the system prompt be bypassed?** Possibly, since it is an instruction to the model and not a hard filter. A stronger version adds a separate topic check before answering.
- **What if the AI provider fails?** The API returns 502 with a friendly message, and the saved question is removed so history has no unanswered messages.
- **Why `?` placeholders in SQL?** They prevent SQL injection.
- **Why `cors()`?** The frontend and backend run on different ports, and the browser blocks cross-origin calls otherwise.
- **Why keep the API key in `.env`?** Secrets must never go in code or Git. `.env` is in `.gitignore`.
- **Why a connection pool?** It reuses connections instead of opening a new one for every request.
- **What would you improve?** Multiple conversations per user, authentication, streaming responses, rate limiting, tests.

## 5. Challenges to mention (honest and memorable)
- The AI model I first picked was retired, and another model returned "503 high demand". I switched to a lighter model and learned to read the provider's error messages.
- A failed AI call used to leave an unanswered question in the database. I fixed it by deleting that row on failure.
- The app looked frozen when the provider was slow. Lesson: add a timeout.

## 6. Before you present
- [ ] Start order: `docker start chatgpt-mysql`, then backend `npm run dev`, then frontend `npm run dev`.
- [ ] Do one full test question 10 minutes before. Models can be overloaded or renamed.
- [ ] **Rotate your API key** (it was pasted in a chat) and update `backend/.env`.
- [ ] Take screenshots of a working demo as a backup in case of network or provider trouble.
- [ ] Be ready to open and explain these files: `server.js`, the chat controller, the AI service (system prompt), `errorHandler.js`, and `App.jsx`.
