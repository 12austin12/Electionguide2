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
1. User logs in with Google.
2. Selects voting checklist items.
3. Data saved securely to Firestore.
4. Dashboard loads saved data with dynamic progress tracking and smart reminders.

### Code Structure
To ensure maximum maintainability and separation of concerns:
- `src/firebase.js` → Firebase config & initialization.
- `src/auth.js` → Authentication logic (Google login/logout).
- `src/db.js` → Firestore database operations (save/load).

## 📸 Screenshots

*(Replace these placeholders with actual screenshots of your application)*
- ![Dashboard View](/path-to-dashboard-screenshot.png)
- ![Smart Reminders](/path-to-reminders-screenshot.png)
- ![Voting Simulator](/path-to-simulator-screenshot.png)

## ✨ Key Features

- **"My Voting Plan" Dashboard:** A Firestore-backed progress tracker with a visual completion progress bar.
- **Smart Assistant:**
  - Provides rule-based guidance for common voting questions
  - Helps first-time voters understand key steps
- **Voting Simulator:** A 3D-styled interactive walkthrough of a polling booth.
- **Eligibility Checker:** A quick logic-based tool to determine voting eligibility.
- **Premium User Experience:** Built with a "Cyber-Civic" aesthetic featuring deep glassmorphism, fluid Framer Motion animations, and responsive layout.

## 💻 Technology Stack

- **Frontend:** React.js, Vite, Framer Motion, Lucide React
- **Google Services:** Firebase (Auth, Firestore)
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
