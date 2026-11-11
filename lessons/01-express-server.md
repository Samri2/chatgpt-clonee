# Lesson 1 – Express server

**Goal:** a running Express server on port 3777.

## Concepts
- `package.json` describes your project; `"type": "module"` lets you use `import`.
- Express is a library that listens for HTTP requests and maps (method + path) to handler functions `(req, res)`.
- `.env` holds config/secrets; `dotenv` loads it into `process.env`.

## Tasks
1. In `backend/`: `npm init -y`, enable ES modules.
2. Install `express`, `cors`, `dotenv`; dev-install `nodemon`.
3. Add scripts `start` and `dev` to `package.json`.
4. Create `.env` (`PORT=3777`) and `.gitignore` (`node_modules`, `.env`).
5. Create `server.js`: import express, create the app, `app.use(cors())`, `app.use(express.json())`, a `GET /` route, and `app.listen`.

## Hints
- `import express from 'express'` then `const app = express()`.
- `res.send('text')` replies; `app.listen(port, callback)` starts the server.
- `import dotenv from 'dotenv'; dotenv.config()` before reading `process.env.PORT`.

## Checkpoint
`npm run dev` prints "Server is running…" and `curl http://localhost:3777/` returns your text.

## Think about
Why do we need `express.json()` before reading `req.body`? Why `cors()`? (Frontend runs on a different port.)

## Commands you'll run
```bash
cd ~/project/Evangadi/phase-4/week-1/chatgpt/backend
npm init -y
npm install express cors dotenv
npm install -D nodemon
# after editing package.json (type + scripts) and creating server.js:
npm run dev
# in a second terminal:
curl http://localhost:3777/
```
Stop the server with `Ctrl+C`.
