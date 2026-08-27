
# 🤖 AI Resume Screening System

An AI-powered Resume Screening System built with the MERN stack. This application analyzes a candidate's resume against a job description and generates an AI-based match score and feedback.

---

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

---

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

---

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
````

---

## 🚀 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/seemalimran26/AI-Resume-Screening.git
cd AI-Resume-Screening
```

### 2. Backend Setup

```bash
cd backend_ai
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `backend_ai` folder.

Add the following:

```env
MONGO_URI=your_mongodb_connection_string
CO_API_KEY=your_cohere_api_key
```

> ⚠️ Never upload your `.env` file or API keys to GitHub.

### 4. Start the Backend

```bash
node index.js
```

The backend will run on:

```text
http://localhost:4000
```

### 5. Frontend Setup

Open a **new terminal** and go to the project folder:

```bash
cd AI-Resume-Screening
cd mern_ai
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## 🔄 How It Works

1. Login or create an account.
2. Upload a PDF resume.
3. Enter a job description.
4. Click the **Analyze** button.
5. The backend extracts text from the resume.
6. Cohere AI compares the resume with the job description.
7. A match score and feedback are generated.
8. The result is stored in MongoDB.
9. Users can view their previous results in **History**.
10. Administrators can view screening records in the **Admin Panel**.

---

## 📊 Dashboard

Users can:

* Upload their PDF resume
* Enter a job description
* Analyze their resume
* Receive an AI-generated match score
* Receive AI-generated feedback

---

## 🕘 History

Users can view their previous screening results, including:

* Resume name
* Match score
* AI feedback
* Screening date

---

## 👨‍💼 Admin Panel

Administrators can view:

* Total screening records
* Candidate information
* Resume names
* Job descriptions
* Match scores
* AI feedback
* Screening dates

---

## 🤖 AI Integration

Cohere AI is used to compare resumes with job descriptions and generate:

* Match score
* Candidate strengths
* Missing skills
* AI feedback

A valid Cohere API key is required for AI analysis.

---

## 🗄️ Database

This application uses **MongoDB Atlas** to store:

* User information
* Resume screening records
* Job descriptions
* Match scores
* AI feedback

Each user should create their own MongoDB Atlas database and configure the connection string in `.env`.

---

## 🔐 Privacy & Security

This repository does **not** contain private database credentials or API keys.

Never upload:

* `.env`
* MongoDB passwords
* MongoDB credentials
* Cohere API keys
* Access tokens

Sensitive credentials should always be stored in environment variables.

---

## 📱 Responsive Design

The application is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

---

## ⚠️ Disclaimer

This project is developed for educational and demonstration purposes.

AI-generated resume screening results should not be used as the sole basis for employment decisions. Human review should always be considered when evaluating candidates.

---

## 👩‍💻 Author

**Seemal Imran**

AI Resume Screening System

Built with the MERN Stack

````

