# Interview Platform

A live coding interview platform to host remote technical interviews with real-time video, chat, collaborative code editing and code execution.

---

📌 **Demo:** https://your-demo-url.example.com  
(Replace with your live demo URL)

---

## Motivation ✅
I built this project to make it easy to run remote technical interviews and practice sessions with a single integrated tool: live video, chat, collaborative coding, and a safe code execution backend so interviewers and candidates can focus on the problem, not the tooling.

---

## Features ✨
- Live video calls (Stream Video)
- Real-time chat (Stream Chat)
- Collaborative code editor and "Run Code" (Piston public API)
- Session creation, scheduling and management (MongoDB + backend)
- Authentication (Clerk)
- Background event orchestration (Inngest)
- Basic analytics / stats for sessions

---

## Tech Stack 🔧
- Frontend: React, Vite, Tailwind, Monaco (code editor)
- Backend: Node.js, Express, Inngest, Mongoose
- Database: MongoDB Atlas
- Realtime & Video: Stream (video + chat via @stream-io/node-sdk and stream-chat)
- Code execution: Piston (https://emkc.org/api/v2/piston)
- Authentication: Clerk

---

## Services & What They Do 💡
- **MongoDB** — persistent storage for users and sessions.
- **Stream (GetStream)** — provides real-time chat and video/call capabilities used for live interviews and chat channels.
- **Inngest** — serverless/event orchestration used to run background tasks (e.g., sync users, cleanup, async workflows).
- **Piston** — external service used to execute code snippets (used by the "Run Code" feature).
- **Clerk** — handles authentication (sign-in, user management).

---

## Environment Variables ⚠️
> Add these to `backend/.env` (do NOT commit secrets to git)

```
# backend/.env
PORT=3000
DB_URL=your_mongo_connection_string
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
STREAM_API_KEY=...
STREAM_API_SECRET=...
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
FRONT_END_URL=http://localhost:5173
```

> Add these to `frontend/.env`

```
# frontend/.env (Vite env vars)
VITE_REACT_APP_BACKEND_BASEURL=http://localhost:8080
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_STREAM_API_KEY=...
```

---

## Installation & Run Locally 🚀
1. Clone the repo

```bash
git clone https://github.com/yourname/Interview-Platform.git
cd Interview-Platform
```

2. Backend

```bash
cd backend
npm install
# create/edit backend/.env with the variables above
npm run dev
```

3. Frontend (in a second terminal)

```bash
cd frontend
npm install
# create/edit frontend/.env
npm run dev
```

Open the frontend app at the Vite URL (usually http://localhost:5173) and ensure backend is running at the `VITE_REACT_APP_BACKEND_BASEURL` you set.

---

## Where to Put Your Image 📷
Add a screenshot so visitors can quickly see the app design. Place the image at the repository root (or `frontend/public`) and update the README image reference below.

Example (place an image file named `screenshot.png` at the repo root):

```md
![App screenshot](./screenshot.png)
```

---

## Notes & TODOs ✅
- Replace the demo URL at the top with the live URL once deployed.
- Remove or rotate any scoped credentials from `.env` files before publishing the repo.

---

## Contributing
PRs and issues are welcome. If you add new env vars or services, please update this README.

---

## License
MIT (update as needed)
