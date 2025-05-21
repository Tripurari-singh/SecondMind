# Second Mind

Second Mind is a modern MERN-stack (MongoDB, Express, React, Node.js) application built with TypeScript. It allows users to securely store and manage personal memories such as YouTube links, Twitter posts, LinkedIn profiles, and custom tags — effectively creating a personal knowledge and content repository.

## Features

- **Full MERN stack** with TypeScript for strong typing and better developer experience
- **User Authentication & Authorization** using JWT for secure access
- **CRUD Operations**: Create, Read, Update, and Delete memories easily
- **Rich Memory Types**: Store URLs from YouTube, Twitter, LinkedIn, and tag them
- **Responsive UI** built with React and modern CSS (or Tailwind, if you used it)
- **State Management** with React hooks or Redux (specify which one you use)
- **Backend API** built on Express.js with RESTful endpoints
- **MongoDB** as the database for scalable and flexible data storage
- **Error Handling** and validations for robust and secure application
- **TypeScript** support throughout frontend and backend for maintainability
- **Modular Code Structure** for easy scalability and maintainability
- **Environment Variables** for secure management of sensitive information
- **CORS** enabled to support frontend-backend communication
- **GitHub Actions / CI (optional)** to automate builds/tests (if implemented)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Tripurari-singh/SecondMind.git
cd SecondMind
```
2. Install dependencies for both frontend and backend:

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

3. Set up environment variables:

Create .env files in both backend and frontend directories (if applicable), e.g.:

```bash
# backend/.env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

```

4. Run the backend and frontend servers:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start

```

---





