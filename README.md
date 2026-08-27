# 🤖 AI Resume Screening System

An AI-powered Resume Screening System built with the MERN stack. This application analyzes a candidate's resume against a job description and generates an AI-based match score and feedback.

## ✨ Features

- 🔐 User Authentication
- 📄 PDF Resume Upload
- 💼 Job Description Input
- 🤖 AI-Powered Resume Screening
- 📊 Resume Match Score
- 💡 AI-Generated Feedback
- 🕘 Screening History
- 👨‍💼 Admin Dashboard
- 📱 Responsive Design
- 🗄️ MongoDB Database

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Material UI
- Axios
- CSS Modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- pdf-parse
- Cohere AI

## 📁 Project Structure

```text
AI-Resume-Screening/
│
├── backend_ai/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── utils/
│   ├── conn.js
│   ├── index.js
│   └── package.json
│
├── mern_ai/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
├── package-lock.json
└── README.md
```

🚀 Installation & Setup

1. Clone the Repository

git clone (https://github.com/seemalimran26/AI-Resume-Screening.git)
cd public_ai_resume_mern-main

2. Backend Setup

cd backend_ai
npm install

3. Environment Variables

Create a .env file inside the backend_ai folder.
Add:
MONGO_URI=your_mongodb_connection_string
CO_API_KEY=your_cohere_api_key

4. Start the Backend

node index.js

5. Frontend Setup

Open a new terminal:
cd public_ai_resume_mern-main
cd mern_ai
npm install

6. Start the Frontend

npm run dev

🔄 How It Works
Login or create an account.
Upload a PDF resume.
Enter a job description.
Click the Analyze button.
The backend extracts text from the resume.
Cohere AI compares the resume with the job description.
A match score and feedback are generated.
The result is stored in MongoDB.
Users can view their previous results in History.
Administrators can view screening records in the Admin Panel.
📊 Dashboard

Users can upload their resume, enter a job description, and receive an AI-generated match score and feedback.

🕘 History

Users can view their previous screening results, including:

Resume name
Match score
AI feedback
Screening date
👨‍💼 Admin Panel

Administrators can view:

Total screening records
Candidate information
Resume names
Job descriptions
Match scores
AI feedback
Screening dates
🔐 Privacy & Security

This repository does not contain private database credentials or API keys.

Never upload:

.env
MongoDB passwords
MongoDB credentials
Cohere API keys
Access tokens

Each person using this project should create their own MongoDB Atlas database and Cohere API key.

🤖 AI Integration

Cohere AI is used to compare resumes with job descriptions and generate:

Match score
Candidate strengths
Missing skills
AI feedback
⚠️ Disclaimer

This project is developed for educational and demonstration purposes.

AI-generated screening results should not be used as the sole basis for employment decisions. Human review should always be considered.

👩‍💻 Author

Seemal Imran

AI Resume Screening System
Built with the MERN Stack
