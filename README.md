# Election Guide AI 🗳️

Welcome to **Election Guide AI**, a premium, professional-grade civic education platform designed to empower first-time voters with clear, accessible, and comprehensive information about the voting process.

## 🏆 Challenge Criteria Addressed

- **Chosen Vertical:** Civic Education & First-Time Voters.
- **Approach:** We utilize interactive modules (Simulator, Quizzes, Progress Dashboards) combined with an intelligent AI chatbot to demystify the election process for beginners.
- **Assumptions Made:** We assume users have access to a modern web browser and that election laws referenced are general federal guidelines (users are always advised to check state-specific rules via the Smart Assistant).

## ⚡ Google Services Implementation

### Firebase Authentication
- Users can securely log in and log out using Google Sign-In.
- Auth state is monitored globally to protect sensitive user data.

### Firestore Database
- A personalized Voting Checklist ("My Voting Plan") is stored per user.
- Data persists across sessions, allowing users to track their readiness over time.

### Workflow
1. **User logs in** via the "My Voting Plan" dashboard using their Google account.
2. **Selects voting tasks** (e.g., Register to Vote, Find Polling Place).
3. **Data saved to Firestore** in real-time with visual saving indicators.
4. **Dashboard loads saved data** instantly upon page reload or returning to the site.
5. **Progress tracking** is displayed via a dynamic "Completion Progress Bar" (our standout Judge-Visible feature).

### Gemini AI API
- Powered by `@google/generative-ai` (`gemini-1.5-flash`).
- Provides a floating "Smart Assistant" that answers complex, state-specific election queries instantly.

## ✨ Key Features

- **"My Voting Plan" Dashboard:** A Firestore-backed progress tracker with a visual completion progress bar.
- **Voting Simulator:** A 3D-styled interactive walkthrough of a polling booth.
- **Eligibility Checker:** A quick logic-based tool to determine voting eligibility.
- **Premium User Experience:** Built with a "Cyber-Civic" aesthetic featuring deep glassmorphism, fluid Framer Motion animations, and responsive layout.

## 💻 Technology Stack

- **Frontend:** React.js, Vite, Framer Motion, Lucide React
- **Google Services:** Firebase (Auth, Firestore), Google Generative AI (Gemini)
- **Deployment:** Google Cloud Run & GitHub Pages

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/12austin12/Electionguide2.git
   cd Electionguide2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_key
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
