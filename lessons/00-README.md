# ChatGPT Clone – Lessons

How we work: read the lesson, write the code yourself, run it, check the **Checkpoint**. Stuck? Try the **Hints** first, then ask Claude. A finished reference exists in `../backend-reference/` – peek only after you've tried.

| # | Lesson | Video |
|---|--------|-------|
| 1 | Express server | Initial Backend Setup |
| 2 | MySQL & the table | Database Setup |
| 3 | Folder structure | Folder Structure & Server Refactoring |
| 4 | POST API (+ AI + system prompt) | Preparing the POST Request API |
| 5 | GET API | Preparing the GET Request API |
| 6 | Error handling & Postman | (review) |
| 7 | Frontend connect | Frontend videos 1-6 |

Target API contract (the frontend needs exactly this):
- GET  `/api/chat/conversations` -> `{ success: true, data: { conversations: [...] } }`
- POST `/api/chat/conversations` body `{ question }` -> `{ success: true, data: { userConversation, assistantConversation } }`
- Errors -> `{ success: false, message }`

Rules: one step at a time, fix errors before moving on, never commit `.env`.
