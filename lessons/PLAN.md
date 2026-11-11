# ChatGPT Clone – Plan

Ports: backend 3777, frontend Vite default. DB: MySQL (Docker). AI: openai SDK (baseURL/model configurable).

## Backend
- [ ] 1. Setup: package.json (ESM), deps, .env, .gitignore
- [ ] 2. MySQL in Docker, `conversations` table (schema.sql), db pool
- [ ] 3. Folder structure: server.js, config, routes, controllers, services, middleware
- [ ] 4. POST /api/chat/conversations (validate -> save user -> AI -> save assistant -> return both)
- [ ] 5. GET /api/chat/conversations
- [ ] 6. System prompt restricting to programming/CS/IT topics
- [ ] 7. Error handling: 400 validation, 500 DB, 502 AI
- [ ] 8. Postman tests (GET, POST valid, POST off-topic, POST empty)

## Frontend (frontend-codebase-content-1778460606393/frontend)
- [ ] npm install, npm run dev, API URL = http://localhost:3777/api
- [ ] Verify: history loads, send question, answer shown, persists on refresh

## Response contract (required by frontend)
GET  -> { success, data: { conversations: [{id, role, content, created_at}] } }
POST -> { success, data: { userConversation, assistantConversation } }
Error-> { success: false, message }
