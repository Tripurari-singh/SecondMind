#  Second Mind

**Second Mind** is your **personal digital memory vault**, built to **save and organize important content** from platforms like **YouTube**, **LinkedIn**, **Twitter**, and more — all in one place.

>  Never lose a valuable post again. Let your Second Mind remember it for you.

---

##  Features

###  Backend
-  Authentication & Authorization
-  Zod-based schema validation
-  JWT Token-based session management
-  Shareable link generation for saved posts
-  Modular & scalable Node.js architecture

###  Frontend
-  Built with React + TypeScript
-  Tailwind CSS for utility-first styling
-  Internal custom UI component library
-  Responsive & accessible design
-  Bookmark manager UI

---

## 🛠 Tech Stack

| Layer      | Tech Stack                                  |
|------------|---------------------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Custom UI  |
| Backend    | Node.js, Express, TypeScript, Zod, JWT      |
| Database   | PostgreSQL / MongoDB (configurable)         |
| Validation | Zod                                         |
| Auth       | JWT, Role-based Access Control              |

---


---

## 📦 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/second-mind.git
cd second-mind

###  Auth Routes

| Method | Endpoint        | Description            |
|--------|-----------------|------------------------|
| POST   | /auth/register  | Register a new user    |
| POST   | /auth/login     | Login & get JWT token  |

###  Post Routes

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | /posts           | Fetch all saved posts   |
| POST   | /posts           | Save a new post         |
| GET    | /posts/:id       | Fetch a single post     |
| DELETE | /posts/:id       | Delete a saved post     |
| GET    | /share/:linkId   | View shared post by link|



