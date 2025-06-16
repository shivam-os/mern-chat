# 💬 ByteChat — MERN Real-Time Chat App

ByteChat is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging.

Currently it's not mobile responsive.

🚀 **Live Demo**: [https://mern-chat-frontend-n3z6.onrender.com](https://mern-chat-frontend-n3z6.onrender.com)

---

## 🛠️ Run ByteChat Locally

To run ByteChat on your local machine, follow these steps:

---

### Create a .env file with the following contents (in backend folder):

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
BASE_URL_BACKEND=http://localhost:3003

---

### Create a .env file with the following contents (in backend folder):

VITE_BACKEND_URL=http://localhost:3003/api/v1
VITE_SOCKET_URL=http://localhost:3003

### Build & Run

Make sure to do this in both the frontend and backend folders:

1. npm install
2. npm run dev
