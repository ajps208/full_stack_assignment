# Full Stack Software Engineer Assignment – Submission Form

## 📌 Project Overview

This project is a production-ready full stack application that allows users to submit personal details and track their processing status.

The system allows users to submit personal details through a frontend form.
Submitted data is validated, stored, and processed asynchronously using a scheduled batch job, which communicates with an external API and updates record statuses accordingly.

Only successfully processed records are displayed on the frontend.

---

## 🏗️ Architecture Overview

Frontend (React + Tailwind)
|
| REST API
v
Backend (Node.js + Express)
|
| Database (MongoDB)
v
Scheduler (Cron Job)
|
| Batch API Call (every 2 hours)
v
External API

---

## ⚙️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- react-phone-number-input
- react-toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- node-cron (Scheduler)
- nanoid (Unique ID generation)

---

## 📁 Mono-Repo Structure

full_stack_assignment/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingInput.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── SuccessTable.jsx
│   │   │   └── Loader.jsx
│   │   ├── Helpers/helpers.js
│   │   ├── Services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── helpers/
│   │   │   └── helpers.js
│   │   ├── models/
│   │   │   └── Record.js
│   │   ├── routes/
│   │   │   └── record.routes.js
│   │   ├── jobs/
│   │   │   └── batchJob.js
│   │   ├── services/
│   │   │   └── externalApi.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md

---

## 🔄 Application Flow (End-to-End)

### 1. Frontend Load
- Fetches records with SUCCESS status
- Displays loading indicator while fetching

### 2. Form Submission
- User submits data via form
- Client-side validation applied
- Data sent to backend API

### 3. Backend Processing
- Validates request data
- Stores record with status PENDING
- Generates unique numeric ID using nanoid

### 4. Scheduled Batch Job
- Runs every 2 hours
- Picks up to 10 records with status PENDING or FAILED
- Sends batch to external API
- Updates record status based on API response

### 5. Frontend Display
- Only records marked SUCCESS are shown to users

---

## 🧪 Backend Validation Rules

## Backend Validation Rules

- Name: required
- Email: required and must be valid
- Phone: required and supports international format
- URL: optional, must be valid if provided
- DOB: optional, format DD/MM/YYYY

---

## ⏱️ Batch Job Logic

- Implemented using node-cron
- Runs automatically when server starts
- Batch size limited to 10 records
- Retries failed records
- Prevents reprocessing successful records

---

## 🌐 API Endpoints

Submit Record  
POST /api/records

Fetch Successful Records  
GET /api/records/success

---

## 🚀 Running the Project Locally

Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

---

## 🌍 Deployment

Frontend: Vercel  
Backend: Render  
Database: MongoDB Atlas

Environment variables are configured securely for production.

---

## 🔀 Git Workflow & Branching

- Mono-repo with feature-based branches
- Each feature developed in isolation
- Pull Requests created for every feature
- Self-review comments added
- No direct commits to main

Example Branches
- feature/backend-api
- feature/backend-batch-job
- feature/frontend-ui-tailwind
- feature/backend-dob-validation-and-id

---

## 🏁 Final Notes

This project focuses on clarity, correctness, and production-oriented design, following real-world development practices including clean Git history, PR-based workflow, and scalable architecture.
