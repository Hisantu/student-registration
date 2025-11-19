# Student Registration

Simple Node/Express + MongoDB app that lets users register students.

## Local run
1. npm install
2. Set MONGO_URL if using remote DB, or run local MongoDB.
3. npm start
4. Open http://localhost:3000

## Deploy on Render
- Create a GitHub repo and push this project.
- On Render: New → Web Service → Connect repo.
- Environment:
  - Environment: Node
  - Build Command: npm install
  - Start Command: node server.js
  - Add env var: MONGO_URL (MongoDB Atlas connection string)
- Click create; Render will build and give a live URL.
