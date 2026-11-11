# Lesson 5 – GET API

**Goal:** return saved history, oldest first.

## Concepts
- `ORDER BY id ASC` keeps chat order. The frontend renders the array as-is.

## Tasks
1. Replace the placeholder with `SELECT id, role, content, created_at FROM conversations ORDER BY id ASC`.
2. Respond `{ success: true, data: { conversations: rows } }`.
3. Wrap in `try/catch`, pass errors to `next(err)`.

## Checkpoint
After a few POSTs, GET returns them all in order and they survive a server restart.

## Commands you'll run
```bash
curl http://localhost:3777/api/chat/conversations
# restart test: Ctrl+C the server, `npm run dev`, then GET again - data should still be there
```
