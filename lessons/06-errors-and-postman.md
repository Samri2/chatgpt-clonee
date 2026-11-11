# Lesson 6 – Error handling & Postman

**Goal:** every failure returns a clear JSON message with the right status.

## Concepts
- 400 = client mistake, 500 = database/server, 502 = upstream (AI provider) failed.
- Tag errors (e.g. `err.source = 'db' | 'ai'`) and let one error middleware decide the response.
- Express 5 forwards rejected async errors, but explicit `try/catch` + `next(err)` is clearer.

## Tasks
1. Tag DB errors and AI errors in the controller; map them in `errorHandler.js`.
2. Handle invalid JSON bodies (`err.type === 'entity.parse.failed'`) -> 400.
3. Decide: if AI fails, should the saved user message stay? Implement your choice (delete it, or keep it).

## Postman test list
- GET conversations
- POST valid programming question
- POST off-topic question (should be declined)
- POST `{}` -> 400
- POST invalid JSON -> 400
- Wrong API key in `.env` -> 502

## Checkpoint
All six behave as described, and the server never crashes.

## Commands you'll run
```bash
B=http://localhost:3777/api/chat/conversations
curl -i $B                                                          # GET
curl -i -X POST $B -H "Content-Type: application/json" -d '{}'      # expect 400
curl -i -X POST $B -H "Content-Type: application/json" -d '{bad'    # expect 400
curl -i -X POST $B -H "Content-Type: application/json" \
  -d '{"question":"Explain REST APIs"}'                             # expect 201
# wrong key test: change OPENAI_API_KEY in .env, restart, POST again -> expect 502
```
`-i` shows the status code, which is what you're checking here.
