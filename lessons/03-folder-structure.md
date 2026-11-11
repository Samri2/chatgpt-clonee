# Lesson 3 – Folder structure & refactor

**Goal:** split code by responsibility.

## Concepts
- **Routes** map URL -> controller. **Controllers** handle req/res. **Services** do outside work (AI). **Middleware** runs between request and response (errors, logging).
- Small files = easier debugging.

## Tasks
Create: `routes/chatRoutes.js`, `controllers/chatController.js`, `services/aiService.js`, `middleware/errorHandler.js`.
1. In `chatRoutes.js`, make an `express.Router()` and export it.
2. In `server.js`: `app.use('/api/chat', chatRoutes)`.
3. Add a placeholder controller returning `{ success: true, data: { conversations: [] } }` for GET `/conversations`.
4. Add a 404 handler and an error-handling middleware (4 params: `err, req, res, next`) in `errorHandler.js`; register them **last**.

## Hints
- Router paths are relative to the mount path: `router.get('/conversations', ...)` becomes `/api/chat/conversations`.
- Use `export` / `import` with `.js` extensions in ESM.

## Checkpoint
`GET /api/chat/conversations` returns your placeholder; `GET /nope` returns your 404 JSON.

## Commands you'll run
```bash
cd ~/project/Evangadi/phase-4/week-1/chatgpt/backend
mkdir routes controllers services middleware config
touch routes/chatRoutes.js controllers/chatController.js services/aiService.js middleware/errorHandler.js
npm run dev
curl http://localhost:3777/api/chat/conversations
curl http://localhost:3777/nope
```
