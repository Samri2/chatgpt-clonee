# Lesson 7 – Frontend

**Goal:** React app talks to your backend.

## Tasks
1. `cd frontend && npm install && npm run dev`.
2. Read `src/App.jsx`: find `API_BASE_URL` and what shape it expects from GET/POST.
3. Follow the videos: Sidebar -> Header -> MessageList + Axios -> ChatMessage -> ChatInput.
4. Backend running on 3777, frontend open in browser.

## Checkpoint (completion criteria)
- Old messages load on page load.
- Send a question -> answer appears, and persists after refresh.
- Off-topic question gets a polite programming redirect.
- Stop the backend and send a message -> the chat shows an error message instead of breaking.

## Debug tips
Browser DevTools -> Network tab (status + response body); Console (CORS errors mean `cors()` missing); backend terminal logs.

## Commands you'll run
```bash
# terminal 1 - backend
cd ~/project/Evangadi/phase-4/week-1/chatgpt/backend
docker start chatgpt-mysql        # if not running
npm run dev

# terminal 2 - frontend
cd ~/project/Evangadi/phase-4/week-1/chatgpt/frontend
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).
